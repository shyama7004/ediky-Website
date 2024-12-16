from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import tempfile
import os
import shutil

app = Flask(__name__)
CORS(app, resources={r"/execute": {"origins": ["https://mlorbit.netlify.app", "http://localhost:3000"]}})

@app.route('/execute', methods=['POST'])
def execute_code():
    data = request.json
    code = data.get("code", "")
    language = data.get("language", "")

    language_map = {
        "python": {"extension": ".py", "command": ["python3"]},
        "cpp": {"extension": ".cpp", "command": ["g++"]},
        "java": {"extension": ".java", "command": ["javac"]},
    }

    if language not in language_map:
        return jsonify({"output": "Unsupported language"}), 400

    temp_dir = tempfile.mkdtemp()
    source_file = os.path.join(temp_dir, "Main" + language_map[language]["extension"])

    with open(source_file, "w") as f:
        f.write(code)

    try:
        if language == "cpp":
            subprocess.run(["g++", source_file, "-o", f"{temp_dir}/output"], check=True)
            output = subprocess.run([f"{temp_dir}/output"], capture_output=True, text=True).stdout
        elif language == "python":
            output = subprocess.run(["python3", source_file], capture_output=True, text=True).stdout
        elif language == "java":
            subprocess.run(["javac", source_file], check=True)
            output = subprocess.run(["java", "-cp", temp_dir, "Main"], capture_output=True, text=True).stdout
        return jsonify({"output": output})
    except subprocess.CalledProcessError as e:
        return jsonify({"output": e.stderr}), 400
    finally:
        shutil.rmtree(temp_dir)

if __name__ == '__main__':
    app.run(debug=True, port=5000)

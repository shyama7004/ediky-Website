from mlorbit_backend.server import app
import pytest

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_server_response(client):
    response = client.get('/')
    assert response.status_code == 200

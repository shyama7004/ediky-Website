# 📘 Reinforcement Learning – Intro

Reinforcement Learning (RL) is a branch of machine learning where an **agent** learns to make decisions by interacting with an **environment** to maximize some notion of **cumulative reward** over time.

---

## 🧠 Key Concepts

- **Agent**: The learner or decision maker (e.g., a robot, a game player).
- **Environment**: The world the agent interacts with.
- **State**: A representation of the current situation of the environment.
- **Action**: A set of all possible moves the agent can make.
- **Reward**: A scalar value received after taking an action.
- **Policy**: A strategy used by the agent to decide actions.
- **Episode**: A full sequence from initial state to terminal state.

---

## 🛠️ Installation

To get started, install the required package:

```bash
pip install gymnasium
````

---

## 🎮 Basic Example: CartPole

In this example, the agent tries to balance a pole on a moving cart.

```python
import gymnasium as gym

# Create the environment
env = gym.make("CartPole-v1", render_mode="human")

# Reset the environment to get the initial state
state, _ = env.reset()

done = False
while not done:
    # Random action: 0 (left) or 1 (right)
    action = env.action_space.sample()

    # Apply action and receive next state and reward
    state, reward, done, truncated, info = env.step(action)

# Close the environment
env.close()
```

---

## 🔁 Agent-Environment Loop

```
               +------------+
               |  Agent     |
               +------------+
                     |
              Action |
                     v
               +------------+
               | Environment|
               +------------+
                     |
          State, Reward |
                     v
               +------------+
```

The **agent** selects an action → the **environment** responds with a new state and reward → repeat.

---

## 🧪 Notes on `gymnasium`

* `env.step(action)` returns:
  `(next_state, reward, done, truncated, info)`
* Use `env.render()` only if `render_mode="human"` is set.
* `env.reset()` returns the initial state and optional info.

---

## 📌 Common Environments

| Environment ID   | Description               |
| ---------------- | ------------------------- |
| `CartPole-v1`    | Balance a pole            |
| `MountainCar-v0` | Drive up a hill           |
| `Acrobot-v1`     | Swing up a two-link robot |
| `FrozenLake-v1`  | Grid world navigation     |

---

## 📚 Next Steps

* Implement a **random agent**
* Try **Q-learning**
* Explore **Deep Q-Networks (DQN)**
* Test on environments like `LunarLander-v2`

---

## ✅ Summary

Reinforcement Learning builds intelligent agents by trial and error using feedback from the environment. `gymnasium` is a great starting point for experimenting with various RL tasks.


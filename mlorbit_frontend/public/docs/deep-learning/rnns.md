
### `public/docs/deep-learning/rnns.md`
```md
# RECURRENT NEURAL NETWORKS (RNNs)

RNNs handle **sequential** data such as text or time‑series.

```python
import torch.nn as nn
model = nn.LSTM(input_size=10, hidden_size=20, num_layers=2)

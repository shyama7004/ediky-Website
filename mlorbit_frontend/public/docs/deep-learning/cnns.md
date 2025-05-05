# CONVOLUTIONAL NEURAL NETWORKS (CNNs)

CNNs excel at **image** tasks.

```python
import torch, torchvision.models as models
resnet = models.resnet18(weights='DEFAULT')

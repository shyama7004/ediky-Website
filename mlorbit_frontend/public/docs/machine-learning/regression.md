# LINEAR REGRESSION

Regression predicts **continuous** values.

```python
from sklearn.linear_model import LinearRegression
model = LinearRegression().fit(X_train, y_train)
print(model.score(X_test, y_test))

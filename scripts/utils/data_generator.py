import pandas as pd
import numpy as np
import os

# Set random seed for reproducibility
np.random.seed(42)

# Parameters
n_samples = 2000
states = ["Maharashtra", "Tamil Nadu", "Karnataka", "Kerala", "Gujarat", "Rajasthan", "Uttar Pradesh", "Bihar", "West Bengal", "Odisha"]

# Generate data
data = {
    "state": np.random.choice(states, n_samples),
    "month": np.random.randint(1, 13, n_samples),
    "rainfall": np.random.uniform(0, 500, n_samples),
    "ph": np.random.uniform(6.0, 8.5, n_samples),
    "bod": np.random.uniform(0, 20, n_samples),
    "nitrate": np.random.uniform(0, 50, n_samples),
    "temp": np.random.uniform(15, 45, n_samples)
}

df = pd.DataFrame(data)

# Logic for "outbreak": higher risk with higher rainfall, bod, nitrate, and temp
# This is a simplified synthetic logic to ensure the model has something to learn
risk_score = (
    (df["rainfall"] / 500) * 0.3 +
    (df["bod"] / 20) * 0.3 +
    (df["nitrate"] / 50) * 0.2 +
    (df["temp"] / 45) * 0.2 +
    np.random.normal(0, 0.1, n_samples)
)

df["outbreak"] = (risk_score > 0.6).astype(int)

# Save to CSV
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
output_dir = os.path.join(BASE_DIR, "data")
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

output_path = os.path.join(output_dir, "idsp_synthetic_v2.csv")
df.to_csv(output_path, index=False)

print(f"Generated {n_samples} samples.")
print(f"Outbreak distribution:\n{df['outbreak'].value_counts()}")
print(f"Saved to {output_path}")

from datasets import load_dataset
 
ds = load_dataset("NIRVLab/rhade-vietnamese-mt")
ds["train"].to_csv("rhade_vi.csv")
print("Xong! File rhade_vi.csv nam cung thu muc voi script nay.")
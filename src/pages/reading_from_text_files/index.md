---
title: Reading From Blobs Efficiently
date: 2018-12-20 17:59:19

---

## The Background

I wanted to integrate my machine learning project into my blog website.   To set up the server, I decided to use Google Cloud Functions as I didn't want to deal with the mundane tasks of server maintenance.  One of my GCF's was tasked to read from a giant CSV file and extract a piece from it to send over to the client.  This created a legitimate bottleneck for two reasons:

1) GCFs are allocated at most 2 GB of memory
2) Memory-consuming code leads to time-consuming code.  

I had to find a way for my program to store only specific lines from the file into memory, as opposed to its default behavior which is to store every line into memory.  

## What Worked

#### The Set-Up

I stored my csv file in Google Cloud Storage.  This was done quite easily in the Google Cloud's console.  When uploading the file, two things were generated: a bucket and a blob.  A bucket is a container that stores the data.  A blob is a Google object that converts the file into a GCS-friendly structure.  In order to read the contents from the blob, I first had to install the GCS client library for python: 

```$ pip install --upgrade google-cloud-storage```

Then in a juypter notebook: 

```python
from google.cloud import storage
storage_client = storage.Client()
bucket = storage_client.get_bucket("my_bucket_name") #your bucket name is a unique string that you setup in the console
blob_names = [ blob.name for blob in bucket.list_blobs() ] #a list of your blob names
blob = bucket.blob(blob_names[0])
```

#### Tackling the Problem

From the GC [API documentation](https://googleapis.github.io/google-cloud-python/latest/storage/blobs.html), there are three ways to read the contents of a blob, but I found that `download_as_string` would be the best method to use as it has two optional parameters to pass, `start (*int*), end (*int*)`, which represent the first and last byte of a range to be downloaded. Since the byte range was deterministic, i.e. the contents of this blob would never change during runtime, I figured that this was the way to solve my problem.  

Determine the offset:

```python
data = blob.download_as_string()
rows = data.split(b"\n")
length_row = []
for i in rows:
    length_row.append(len(i))
max(length_row)
```

The row with the largest byte length covered 20901 bytes.  This was my offset value.  If each row were 20901 bytes long, then the start and end values to be passed in `download_as_string` would just be a multiple of 20901. Therefore...

Make each row 20901 bytes long:

```python
new_matrix = []
for i in rows:
    row_length = len(i)
    if row_length != 20901:
        difference = 20901 - row_length
        new_row = i + b','*difference #add trailing commas at the end of each row
    new_matrix.append(new_row)
```

Write over the blob with new content:

```python
byte_string = b''.join(new_matrix) 
blob.upload_from_string(byte_string) 
```

#### How It Works

Say I have to extract the fifth row in my blob.  Then here's the code to do this:

```python
import numpy as np
idx = 5
relevant_row = blob.download_as_string(start=20901*(idx+1), end=20901*(idx+2)-1)
relevant_row = relevant_row.split(b",")
relevant_row = relevant_row[np.where(relevant_row != b'')]  #gets rid of all the trailing commas at the end
relevant_row = relevant_row.astype(int)
```

I have to increment the index value by one since the first row of my data is the column names.  


Wallah! My problem got fixed. Now my code does data extraction efficiently as it only reads from a specific range of data.  My GCFs aren't complaining about exceeding memory and the website runs faster, too.   




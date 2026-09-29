FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY Flask.py .
COPY ../template template
COPY ../static static

CMD ["python", "Flask.py"]

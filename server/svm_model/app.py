
from flask import Flask, jsonify, make_response, request, redirect

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False


#my SVM
from sklearn.feature_extraction.text import TfidfVectorizer

import time
from sklearn import svm
from sklearn.metrics import classification_report

import pandas as pd

# train Data
trainData = pd.read_csv("data/train.csv")

# test Data
testData = pd.read_csv("data/test.csv")

# Create feature vectors
vectorizer = TfidfVectorizer(min_df = 5,
                             max_df = 0.8,
                             sublinear_tf = True,
                             use_idf = True)

train_vectors = vectorizer.fit_transform(trainData['Content'])
test_vectors = vectorizer.transform(testData['Content'])

# Perform classification with SVM, kernel=linear
classifier_linear = svm.SVC(kernel='linear')
t0 = time.time()
classifier_linear.fit(train_vectors, trainData['Label'])
t1 = time.time()
prediction_linear = classifier_linear.predict(test_vectors)
t2 = time.time()
time_linear_train = t1-t0
time_linear_predict = t2-t1

# results
print("Results for SVC(kernel=linear)")
print("Training time: %fs; Prediction time: %fs" % (time_linear_train, time_linear_predict))
report = classification_report(testData['Label'], prediction_linear, output_dict=True)
print('positive: ', report['pos'])
print('negative: ', report['neg'])

#Input Review
print('\nTest a custom review message')
print('Enter review to be analysed: ', end=" ")
text = "I love this house"
text_vector = vectorizer.transform([text])
result = classifier_linear.predict(text_vector)
#Display Output
print('The review is predicted',result[0])


@app.route('/sentiment', methods=['GET', 'POST'])
def sentiment_analysis():
    if request.method == 'GET':
        text = request.args.get('text')
        if text:
            text_vector = vectorizer.transform([text])
            result = classifier_linear.predict(text_vector)
            return make_response(jsonify({'sentiment': result[0], 'text': text, 'status_code':200}), 200)
        return make_response(jsonify({'error':'sorry! unable to parse', 'status_code':500}), 500)

if __name__ == '__main__':
   app.run()

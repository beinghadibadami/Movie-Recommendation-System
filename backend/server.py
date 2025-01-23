from flask import Flask, request
from utils import recommend_movies, get_cast,get_poster,fetch_movie_details
import requests,json
import pandas as pd 
from flask_cors import CORS

API_KEY = "0308501f946b2c57e450c228b4e5693f"
app = Flask(__name__)
CORS(app)

df=pd.read_csv("backend\movies.csv")

# @app.route('/api/recommend/<int:movie_id>', methods=['GET'])
# def get_recommendations(movie_id):
#     url=f"https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key={API_KEY}"
#     response=requests.get(url)
#     data=json.loads(response.text)
#     recommendations=[]
    
#     for i in data['results']:
#         r={"title":i['title'],
#             "id":i['id'],
#             "poster":i['poster_path']}
#         recommendations.append(r)
        
#     return recommendations



@app.route('/api/search', methods=['GET'])
def search_movies():
    query = request.args.get('q', '').lower()
    results = df[df['title'].str.lower().str.contains(query)][['id', 'title']].head(10).to_dict(orient='records')
    return results

@app.route('/api/details/<int:movie_id>', methods=['GET'])
def movie_details(movie_id):
    try:
        if movie_id in df['id'].values:
            movie = df[df['id'] == movie_id].iloc[0]
            details = {
                "id": int(movie['id']),  # Convert to native Python int
                "title": str(movie['title']),  # Convert to string
                "release_date": str(movie['release_date']),  # Ensure string
                "genre": str(movie['genres']),  # Ensure string
                "runtime": f"{int(movie['runtime']) // 60}h {int(movie['runtime']) % 60}min",  # Ensure int and format
                "overview": str(movie['overview']),  # Ensure string
                "poster": "https://image.tmdb.org/t/p/w500" + str(movie['poster_path']),  # Ensure string
                "cast": get_cast(movie_id),  # Assume `get_cast` returns JSON-serializable data
                "recommendations": recommend_movies(movie_id).to_dict(orient='records')  # Ensure JSON-serializable DataFrame
            }
            return json.dumps(details)
        else:
            details=fetch_movie_details(movie_id)
            return json.dumps(details)

    except IndexError:
        return json.dumps({"error": "Movie not found"}), 404

if __name__ == '__main__':    
    app.run(debug=True,port=5000)

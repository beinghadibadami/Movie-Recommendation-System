import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import heapq
import joblib
import requests,json

API_KEY = "0308501f946b2c57e450c228b4e5693f"

df = pd.read_csv("backend\movies.csv")  # Ensure this file is consistent

tfidf_matrix = joblib.load(r'backend\tfidf_matrix.pkl')

def fetch_movie_details(movie_id):
  """Fetches movie details from the TMDB API and returns them in a dictionary.

  Args:
      movie_id: The ID of the movie to fetch details for.
      api_key: Your TMDB API key.

  Returns:
      A dictionary containing the movie details, or None if there was an error.
  """

  url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={API_KEY}"

#   try:
  response = requests.get(url)
#     response.raise_for_status()  # Raise an exception for non-200 status codes
#   except requests.exceptions.RequestException as e:
#     print(f"Error fetching movie details: {e}")
#     return None

  data = json.loads(response.text)

  details = {}
  details["id"] = data["id"]
  details["title"] = data["title"]
  details["release_date"] = data["release_date"]

  # Extract genre names
  genres = [genre["name"] for genre in data["genres"]]
  details["genre"] = ", ".join(genres)

  # Convert runtime to hours and minutes
  runtime = data["runtime"]
  hours = runtime // 60
  minutes = runtime % 60
  details["runtime"] = f"{hours}h {minutes}min"

  details["overview"] = data["overview"]
  details["poster"] = f"https://image.tmdb.org/t/p/w500{data.get('poster_path')}"

  details['cast']=get_cast(movie_id)

  details['recommendations']=recommend_externally(movie_id)

  return details

def get_cast(movie_id):
    """
    Fetches the top billed cast for a given movie ID from TMDB API.
    """
    url = f"https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key={API_KEY}&language=en-US"
    response = requests.get(url)
    if response.status_code == 200:
        cast_data = response.json().get("cast", [])
        # Return only the required fields
        return [
            {
                "profile_path": f"https://image.tmdb.org/t/p/w200{cast['profile_path']}" if cast.get("profile_path") else None,
                "original_name": cast["original_name"],
                "character": cast["character"],
            }
            for cast in cast_data   
        ]
    return []


def get_poster(id):
    try:
        poster_path = df.loc[df['id'] == id, 'poster_path'].values[0]
        
        # Check if poster_path is a valid string
        if isinstance(poster_path, str) and poster_path.strip():
            return "https://image.tmdb.org/t/p/w500" + poster_path
        else:
            return "https://via.placeholder.com/500x750?text=Poster+Not+Available"
    except IndexError:
        return "https://via.placeholder.com/500x750?text=Poster+Not+Available"
    

# Function to recommend movies
def recommend_movies(movie_id, top_n=10, batch_size=5000):
    
        
            movie_index = df[df['id'] == movie_id].index[0]
        
        # except :
            # return "Movie Not Found"

            movie_vector = tfidf_matrix[movie_index]

            def compute_batch_similarity(movie_vector, tfidf_matrix, movie_index, batch_size, top_n):
                total_movies = tfidf_matrix.shape[0]
                top_similar = []
                for start in range(0, total_movies, batch_size):
                    end = min(start + batch_size, total_movies)
                    batch_matrix = tfidf_matrix[start:end]
                    similarities = cosine_similarity(movie_vector, batch_matrix).flatten()
                    for i, sim in enumerate(similarities):
                        global_index = start + i
                        if global_index == movie_index:
                            continue
                        if len(top_similar) < top_n:
                            heapq.heappush(top_similar, (sim, global_index))
                        else:
                            heapq.heappushpop(top_similar, (sim, global_index))
                top_similar.sort(reverse=True, key=lambda x: x[0])
                return top_similar

            similar_movies = compute_batch_similarity(movie_vector, tfidf_matrix, movie_index, batch_size, top_n)
            recommendations = df.iloc[[movie[1] for movie in similar_movies]][['id', 'title']]
            # recommendations['id'] = recommendations['id'].astype(int)
            recommendations['poster_path'] = recommendations['id'].apply(get_poster)
            return recommendations
        
    
            
def recommend_externally(movie_id):

    
        url=f"https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key={API_KEY}"
        response = requests.get(url)
        # response.raise_for_status()  # Raise an exception for non-200 status codes
#  except requests.exceptions.RequestException as e:
#         print(f"Error fetching movie recommendations: {e}")
#         return None

        data = json.loads(response.text)

        recommendations = []
        for recommendation in data.get("results", []):
            if len(recommendations) >= 10:  # Limit to top 10 recommendations
                break
            recommendation_details = {
            "id": recommendation["id"],
            "title": recommendation["title"],
            "poster_path": f"https://image.tmdb.org/t/p/w500{recommendation.get('poster_path')}",
            }
            recommendations.append(recommendation_details)

        return recommendations

def get_backdrop(id):
    try:
        backdrop_path = df.loc[df['id'] == id, 'backdrop_path'].values[0]
        return "https://image.tmdb.org/t/p/w500" + backdrop_path
    except IndexError:
        return "Backdrop not found"


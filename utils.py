import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import heapq
import joblib
import requests

API_KEY = "0308501f946b2c57e450c228b4e5693f"

df = pd.read_csv("movies.csv")  # Ensure this file is consistent

tfidf_matrix = joblib.load("tfidf_matrix.pkl")



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
def recommend_movies(title, top_n=5, batch_size=5000):
    try:
        movie_index = df[df['title'] == title].index[0]
    except IndexError:
        return "Movie not found"

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
    recommendations['poster_path'] = recommendations['id'].apply(get_poster)
    return recommendations
    

def get_backdrop(id):
    try:
        backdrop_path = df.loc[df['id'] == id, 'backdrop_path'].values[0]
        return "https://image.tmdb.org/t/p/w500" + backdrop_path
    except IndexError:
        return "Backdrop not found"

    
def show_movie_details(id):
    movie = df[df['id'] == int(movie_id)].iloc[0]  # Fetch movie details from DataFrame

    # Backdrop and main poster
    st.image(get_backdrop(movie_id), use_column_width=True, caption=movie['title'])
    st.image(get_poster(movie_id), width=200, caption="Poster")

    # Movie details
    st.write(f"**Title:** {movie['title']}")
    st.write(f"**Genre:** {movie['genres']}")
    st.write(f"**Release Date:** {movie['release_date']}")
    runtime = movie['runtime']
    st.write(f"**Duration:** {runtime // 60}h {runtime % 60}min")
    st.write(f"**Overview:** {movie['overview']}")

    # Cast list
    # st.write("### Cast")
    # cast_list = get_cast(movie_id)  # Function to fetch cast details from TMDB API
    # for cast in cast_list:
    #     st.image(cast['profile_path'], width=100, caption=cast['name'])

    # Recommendations
    st.write("### Recommendations")
    recommendations = recommend_movies(movie['title'])
    for index, row in recommendations.iterrows():
        col1, col2 = st.columns([1, 4])
        with col1:
            st.image(get_poster(row['id']), width=120, use_column_width=False, caption=row['title'])
        with col2:
            st.write(row['title'])

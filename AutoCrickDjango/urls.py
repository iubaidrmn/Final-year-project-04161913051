from django.contrib import admin
from django.urls import path
from autocrick.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    # Show List of all tables in Mongo DB APIs
    path('api/users/', user_list, name='api_user_list'),
    path('api/roles/', roles_list, name='api_roles_list'),
    path('api/matches_list/', matches_list, name='matches_list'),
    path('api/tournament_list/', tournament_list, name='tournament_list'),
    path('api/player_in_match_list/', player_in_match_list, name='player_in_match_list'),
    # Authentication, Registration Routes / APIs
    path('api/login',  login, name='login'),
    path('api/signup', signup, name='signup'),
    # Save Data in Mongo DB APIs
    path('api/tournamentSave', tournamentSave, name='tournamentSave'),
    path('api/matchSave', matchSave, name='matchSave'),
    path('api/playersInMatchSave', playersInMatchSave, name='playersInMatchSave'),
]

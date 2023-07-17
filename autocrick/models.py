from bson import ObjectId
from django.db import models
from djongo import models as djongo_models

# Create your models here.
class User(models.Model):
    _id = djongo_models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    fullname = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    email = models.EmailField()
    password = models.CharField(max_length=255)
    contact_no = models.CharField(max_length=255)
    role_id = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'users'


class UserProfilePic(models.Model):
    _id = djongo_models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    username = models.CharField(max_length=255)
    file_path = models.FileField(upload_to='autocrickreact/public/posts/', blank=True, null=True)
    coverPhoto = models.FileField(upload_to='autocrickreact/public/posts/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'user_profile_pic_path'

class Role(models.Model):
    _id = djongo_models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    role_id = models.CharField(max_length=2)
    role = models.CharField(max_length=30)
    status = models.CharField(max_length=2)

    class Meta:
        db_table = 'roles'

class Matches(models.Model):
    _id = djongo_models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    tournament_id = models.CharField(max_length=24, primary_key=False)
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=255)
    start_date = models.DateField()
    start_time = models.TimeField()
    team_id1 = models.CharField(max_length=24, primary_key=False)
    team_id2 = models.CharField(max_length=24, primary_key=False)
    status = models.CharField(max_length=2)
    total_overs = models.CharField(max_length=3)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'matches'

class MatchInnings(models.Model):
    _id = djongo_models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    match_id = models.CharField(max_length=24, primary_key=False)
    target = models.CharField(max_length=3, blank=True, null=True)
    achieved = models.CharField(max_length=3, blank=True, null=True)
    innings_end_first = models.CharField(max_length=1, blank=True, null=True)
    innings_end_second = models.CharField(max_length=1, blank=True, null=True)
    team_won = models.CharField(max_length=24, primary_key=False, blank=True, null=True)
    team_first_innings = models.CharField(max_length=24, primary_key=False, blank=True, null=True)
    team_second_innings = models.CharField(max_length=24, primary_key=False, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'match_innings'

class Players_in_Match(models.Model):
    _id = djongo_models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    user_id = models.CharField(max_length=24, primary_key=False)
    match_id = models.CharField(max_length=24, primary_key=False)

    class Meta:
        db_table = 'players_in_match'

class Tournament(models.Model):
    _id = djongo_models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=255)
    no_of_matches = models.CharField(max_length=3)
    latitude = models.CharField(max_length=50)
    longitude = models.CharField(max_length=50)
    venue = models.CharField(max_length=40)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=2)
    file_path = models.FileField(upload_to='autocrickreact/public/posts/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'tournament'

class Post(models.Model):
    _id = djongo_models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=255)
    file_path = models.FileField(upload_to='autocrickreact/public/posts/', blank=True, null=True)
    created_by = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'post'

class Team(models.Model):
    _id = djongo_models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    title = models.CharField(max_length=30)
    status = models.IntegerField(default = 0)
    coach_id = models.CharField(max_length=24, primary_key=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'teams'

class TeamMembers(models.Model):
    _id = djongo_models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    team_id = models.CharField(max_length=24, primary_key=False)
    player_id = models.CharField(max_length=24, primary_key=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'team_members'

class MatchDetails(models.Model):
    _id = djongo_models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    match_id = models.CharField(max_length=24, primary_key=False)
    batsman_id = models.CharField(max_length=24, primary_key=False)
    bowler_id = models.CharField(max_length=24, primary_key=False)
    runs = models.IntegerField()
    wickets = models.CharField(max_length=3)
    innings = models.CharField(max_length=10)
    extras = models.CharField(max_length=10)
    outOption = models.CharField(max_length=10)
    current_over = models.CharField(max_length=10)
    current_ball = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'match_details'
        
class PendingRequest(models.Model):
    _id = djongo_models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    team_id = models.CharField(max_length=24, primary_key=False)
    tournament_id = models.CharField(max_length=24, primary_key=False)
    status = models.IntegerField(default = 0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'pending_requests'
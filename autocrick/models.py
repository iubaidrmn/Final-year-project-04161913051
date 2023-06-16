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
    status = models.CharField(max_length=2)
    created_at = models.DateTimeField(auto_now_add=True)
    start_time = models.TimeField()
    
    class Meta:
        db_table = 'matches'

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
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'tournament'

class Post(models.Model):
    _id = djongo_models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=255)
    file_path = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'post'

class Team(models.Model):
    _id = djongo_models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    title = models.CharField(max_length=30)
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
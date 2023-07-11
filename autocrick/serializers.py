from rest_framework import serializers 
from .models import *
 
class UserSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('_id', 'fullname', 'username', 'email', 'password', 'contact_no', 'role_id', 'created_at')
    def get__id(self, obj):
        return str(obj._id)
    
class RoleSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    class Meta:
        model = Role
        fields = ('_id', 'role_id', 'role', 'status')
    def get__id(self, obj):
        return str(obj._id)
    
class TournamentSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    class Meta:
        model = Tournament
        fields = ('_id', 'title', 'description', 'no_of_matches', 'latitude', 'longitude', 'venue',
                  'start_date', 'end_date', 'status', 'created_at')
    def get__id(self, obj):
        return str(obj._id)
    
class MatchSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    class Meta:
        model = Matches
        fields = ('_id', 'tournament_id', 'title', 'description', 'start_date','start_time', 'team_id1', 'team_id2',
                   'status', 'created_at')
    def get__id(self, obj):
        return str(obj._id)
    
class PostSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ('_id', 'title', 'description', 'file_path', 'created_at')
    def get__id(self, obj):
        return str(obj._id)
    
class PlayersInMatchSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    class Meta:
        model = Players_in_Match
        fields = ('_id', 'user_id', 'match_id')
    def get__id(self, obj):
        return str(obj._id)
    
class TeamsSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    class Meta:
        model = Team
        fields = ('_id', 'title', 'coach_id', 'created_at')
    def get__id(self, obj):
        return str(obj._id)

class TeamMembersSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    class Meta:
        model = TeamMembers
        fields = ('_id', 'team_id', 'player_id', 'created_at')
    def get__id(self, obj):
        return str(obj._id)

class MatchDetailsSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    class Meta:
        model = MatchDetails
        fields = ('_id', 'match_id', 'batsman_id', 'bowler_id', 'runs', 'wickets', 'innings', 'extras',
                  'outOption', 'current_over', 'current_ball', 'created_at')
    def get__id(self, obj):
        return str(obj._id) 

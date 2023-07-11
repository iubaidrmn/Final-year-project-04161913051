from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *
from django.db.models import Q
from bson import ObjectId
from rest_framework.parsers import FileUploadParser
from pymongo import MongoClient

@api_view(['POST'])
def matchDetailsSave(request):
    try:
        serializer = MatchDetailsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'response': True, 'message': 'Saved Successful.'}, status=200)
        return Response({'response': False, 'error': serializer.errors}, status=400)
    except Exception as e:
        return Response({'response': False, 'error': str(e)}, status=500)

@api_view(['GET'])
def get_user_details(request):
    try:
        _id = request.GET.get('user_id')  # Get the role_id from the request query parameters
        users = User.objects.filter(Q(username=_id) | Q(_id__isnull=True))
        # users = User.objects.filter(Q(_id=_id) | Q(_id__isnull=True))
        serializer = UserSerializer(users, many=True)
        return Response({'users': serializer.data})
    except:
        return Response({'error': 'Can Not Retrieve User List'}, status=400)

@api_view(['GET'])
def get_tournament_details(request):
    try:
        _id = ObjectId(request.GET.get('_id'))
        tournament = Tournament.objects.filter(Q(_id=_id))
        serializer = TournamentSerializer(tournament, many=True)
        return Response({'tournament': serializer.data})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})
    
@api_view(['GET'])
def get_team_details(request):
    try:
        _id = ObjectId(request.GET.get('_id'))
        team = Team.objects.filter(Q(_id=_id))
        serializer = TeamsSerializer(team, many=True)
        return Response({'team': serializer.data})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})

@api_view(['GET'])
def get_match_details(request):
    try:
        _id = ObjectId(request.GET.get('_id'))
        match = Matches.objects.filter(Q(_id=_id))
        serializer = MatchSerializer(match, many=True)
        return Response({'match': serializer.data})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})

@api_view(['GET'])
def get_post_details(request):
    try:
        _id = ObjectId(request.GET.get('_id'))
        post = Post.objects.filter(Q(_id=_id))
        serializer = PostSerializer(post, many=True)
        return Response({'post': serializer.data})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})

@api_view(['GET'])
def user_list(request):
    try:
        role_id = request.GET.get('role_id')  # Get the role_id from the request query parameters
        users = User.objects.filter(Q(role_id=role_id) | Q(role_id__isnull=True))
        serializer = UserSerializer(users, many=True)
        return Response({'users': serializer.data})
    except:
        return Response({'error': 'Can Not Retrieve User List'}, status=400)

@api_view(['GET'])
def getCoachNameOfTeam(request):
    try:
        coach_id = ObjectId(request.GET.get('coach_id'))
        coachNames = User.objects.filter(Q(_id=coach_id))
        serializer = UserSerializer(coachNames, many=True)
        return Response({'coachNames': serializer.data})
    except:
        return Response({'error': 'Can Not Retrieve Teams List'}, status=400)

@api_view(['GET'])
def getTournamentNameofMatch(request):
    try:
        tournament_id = ObjectId(request.GET.get('tournament_id'))
        tournamentNames = Tournament.objects.filter(Q(_id=tournament_id))
        serializer = TournamentSerializer(tournamentNames, many=True)
        return Response({'tournamentNames': serializer.data})
    except:
        return Response({'error': 'Can Not Retrieve Tournament Names List'})

@api_view(['GET'])
def getTeamName(request):
    try:
        team_id = ObjectId(request.GET.get('team_id'))
        teamName = Team.objects.filter(Q(_id=team_id))
        serializer = TeamsSerializer(teamName, many=True)
        return Response({'teamName': serializer.data})
    except:
        return Response({'error': 'Can Not Retrieve Team Name'})

@api_view(['GET'])
def getTournamentMatches(request):
    try:
        tournament_id = ObjectId(request.GET.get('tournament_id'))
        tournamentMatches = Matches.objects.filter(Q(tournament_id=tournament_id))
        serializer = MatchSerializer(tournamentMatches, many=True)
        return Response({'tournamentMatches': serializer.data})
    except:
        return Response({'error': 'Can Not Retrieve Tournament Matches List'})

@api_view(['GET'])
def getMatcheDetailsById(request):
    try:
        match_id = ObjectId(request.GET.get('match_id'))
        matchDetails = MatchDetails.objects.filter(Q(match_id=match_id))
        serializer = MatchDetailsSerializer(matchDetails, many=True)
        return Response({'matchDetails': serializer.data})
    except:
        return Response({'error': 'Can Not Retrieve Matches Details List'})

@api_view(['GET'])
def roles_list(request):
    try:
        roles = Role.objects.all()
        serializer = RoleSerializer(roles, many=True)
        return Response({'roles': serializer.data})
    except:
        return Response({'error': 'Can Not Retrieve Roles List'}, status=400)

@api_view(['GET'])
def tournament_list(request):
    try:
        tournaments = Tournament.objects.all()
        serializer = TournamentSerializer(tournaments, many=True)
        return Response({'tournaments': serializer.data})
    except:
        return Response({'error': 'Can Not Retrieve Tournament List'}, status=400)

@api_view(['GET'])
def matches_list(request):
    try:
        matches = Matches.objects.all()
        serializer = MatchSerializer(matches, many=True)
        return Response({'matches': serializer.data})
    except Exception as e:
        return Response({'error': str(e)}, status=400)
    
@api_view(['GET'])
def post_list(request):
    try:
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response({'posts': serializer.data})
    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['GET'])
def teams_list(request):
    try:
        teams = Team.objects.all()
        serializer = TeamsSerializer(teams, many=True)
        return Response({'teams': serializer.data})
    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['GET'])
def player_in_match_list(request):
    try:
        players_in_match = Players_in_Match.objects.all()
        serializer = PlayersInMatchSerializer(players_in_match, many=True)
        return Response({'players_in_match': serializer.data})
    except:
        return Response({'error': 'Can Not Retrieve Players_in_Match List'}, status=400)

@api_view(['POST'])
def login(request):
    # Extract username and password from request data
    username = request.data.get('username')
    password = request.data.get('password')

    # Perform authentication logic here
    try:
        # Retrieve the user based on the provided username
        user = User.objects.get(username=username)
        userInfo = {
            # '_id': user._id,
            'fullname': user.fullname,
            'username': user.username,
            'role_id': user.role_id,
        }
        # Check if the password matches
        if user.password == password:
            # Credentials are valid, perform any necessary actions
            return Response({'response': True, 'message': 'Login successful', 'user': userInfo}, status=200)
        else:
            return Response({'response': False, 'error': 'Invalid Credentials'})
    except User.DoesNotExist:
        return Response({'response': False, 'error': 'User not found!'})

@api_view(['POST'])
def signup(request):
    try:
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            username = request.data.get('username')
            email = request.data.get('email')
            
            # Check if username exists
            username_exists = len(User.objects.filter(username = username)) > 0
            if username_exists:
                return Response({'response': False, 'error': 'Username already exists.'})
            
            # Check if email exists
            email_exists = len(User.objects.filter(email = email)) > 0
            if email_exists:
                return Response({'response': False, 'error': 'Email already exists.'})

            serializer.save()
            return Response({'response': True, 'message': 'Registration Successful.'})
        return Response({'response': False, 'error': serializer.errors})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})

@api_view(['POST'])
def tournamentSave(request):
    try:
        serializer = TournamentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(file_path=request.FILES['file_path'])
            return Response({'response': True, 'message': 'Tournament Saved Successfully'}, status=200)
        return Response({'response': False, 'error': serializer.errors}, status=400)
    except Exception as e:
        return Response({'response': False, 'error': str(e)}, status=500)

@api_view(['POST'])
def matchSave(request):
    try:
        serializer = MatchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'response': True, 'message': 'Match Saved Successfully'}, status=200)
        return Response({'response': False, 'error': serializer.errors}, status=400)
    except Exception as e:
        return Response({'response': False, 'error': str(e)}, status=500)

@api_view(['POST'])
def postSave(request):
    try:
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(file_path=request.FILES['file_path'])
            return Response({'response': True, 'message': 'Post Uploaded'})
        return Response({'response': False, 'error': serializer.errors})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})

@api_view(['POST'])
def teamSave(request):
    try:
        serializer = TeamsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'response': True, 'message': 'Team Saved Successfully'}, status=200)
        return Response({'response': False, 'error': serializer.errors}, status=400)
    except Exception as e:
        return Response({'response': False, 'error': str(e)}, status=500)

@api_view(['POST'])
def playersInMatchSave(request):
    try:
        serializer = PlayersInMatchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'response': True, 'message': 'player in match Saved Successfully'}, status=200)
        return Response({'response': False, 'error': serializer.errors}, status=400)
    except Exception as e:
        return Response({'response': False, 'error': str(e)}, status=500)
    
@api_view(['POST'])
def teamMembersSave(request):
    try:
        serializer = TeamMembersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'response': True, 'message': 'Team Member Saved Successfully'}, status=200)
        return Response({'response': False, 'error': serializer.errors}, status=400)
    except Exception as e:
        return Response({'response': False, 'error': str(e)}, status=500)

@api_view(['POST'])
def matchDetailsSave(request):
    try:
        serializer = MatchDetailsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'response': True, 'message': 'Saved Successful.'}, status=200)
        return Response({'response': False, 'error': serializer.errors}, status=400)
    except Exception as e:
        return Response({'response': False, 'error': str(e)}, status=500)

@api_view(['PATCH'])
def updateUser(request):
    try:
        user_id = request.data.get('username')
        # user_id = request.data.get('user_id')
        if not user_id:
            return Response({'response': False, 'error': 'User ID not provided.'})
        
        user = User.objects.get(username=user_id)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'response': True, 'message': 'User information updated.'})
        return Response({'response': False, 'error': serializer.errors})
    except User.DoesNotExist:
        return Response({'response': False, 'error': 'User not found.'})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})

@api_view(['PATCH'])
def updateTournament(request):
    try:
        tournamentId = request.GET.get('tournamentId')
        tournamentId = ObjectId(tournamentId)
        if not tournamentId:
            return Response({'response': False, 'error': 'Tournament ID not provided.'})
        
        # tournament = Tournament.objects.get(Q(_id = tournamentId))
        tournament = Tournament.objects.filter(Q(_id = tournamentId)).first()
        serializer = TournamentSerializer(tournament, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'response': True, 'message': 'Tournament information updated.'})
        return Response({'response': False, 'error': serializer.errors})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})

@api_view(['PATCH'])
def updateTeam(request):
    try:
        teamId = request.GET.get('teamId')
        teamId = ObjectId(teamId)
        if not teamId:
            return Response({'response': False, 'error': 'Team ID not provided.'})
        team = Team.objects.filter(Q(_id = teamId)).first()
        serializer = TeamsSerializer(team, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'response': True, 'message': 'Team information updated.'})
        return Response({'response': False, 'error': serializer.errors})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})

@api_view(['PATCH'])
def updateMatch(request):
    try:
        matchId = request.GET.get('matchId')
        matchId = ObjectId(matchId)
        if not matchId:
            return Response({'response': False, 'error': 'Match ID not provided.'})
        match = Matches.objects.filter(Q(_id = matchId)).first()
        serializer = MatchSerializer(match, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'response': True, 'message': 'Match information updated.'})
        return Response({'response': False, 'error': serializer.errors})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})

@api_view(['PATCH'])
def updatePost(request):
    try:
        postId = request.GET.get('postId')
        postId = ObjectId(postId)
        if not postId:
            return Response({'response': False, 'error': 'Post ID not provided.'})
        post = Post.objects.filter(Q(_id = postId)).first()
        serializer = PostSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'response': True, 'message': 'Post information updated.'})
        return Response({'response': False, 'error': serializer.errors})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})

@api_view(['GET'])
def get_top_players(request):
    try:
        # Connect to MongoDB
        client = MongoClient('mongodb://localhost:27017/')
        db = client['autocrick']
        collection = db['match_details']

        # Aggregation pipeline to get top 2 players with names
        pipeline = [
            {"$group": {
                "_id": "$batsman_id",
                "total_runs": {"$sum": {"$toInt": "$runs"}},
                "total_matches": {"$addToSet": "$match_id"},
                "balls_played": {"$sum": 1}
            }},
            {"$project": {
                "_id": 0,
                "batsman_id": "$_id",
                "total_runs": 1,
                "total_matches": {"$size": "$total_matches"},
                "balls_played": 1,
                "strike_rate": {"$multiply": [
                    {"$divide": ["$total_runs", "$balls_played"]},
                    100
                ]}
            }},
            {"$sort": {"total_runs": -1}},
            {"$limit": 2}
        ]

        # Execute the aggregation query
        result = list(collection.aggregate(pipeline))

        return Response({'top_players': result})
    except Exception as e:
        return Response({'error': 'Cannot retrieve top players'}, status=400)

from django.db.models import Sum, Max
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *
from django.db.models import Q
from bson import ObjectId
from rest_framework.parsers import FileUploadParser
from pymongo import MongoClient
from django.utils.timezone import make_aware


@api_view(['GET'])
def player_stats(request):
    try:
        player_id = request.GET.get('player_id')
        
        matches_played = len(MatchDetails.objects.filter(batsman_id=player_id).values('match_id').distinct())
        total_runs = MatchDetails.objects.filter(batsman_id=player_id).aggregate(total=Sum('runs'))['total']
        average_runs = total_runs / matches_played if matches_played != 0 else 0
        best_runs = MatchDetails.objects.filter(batsman_id=player_id).aggregate(best=Sum('runs'))['best']
        hundreds = MatchDetails.objects.filter(batsman_id=player_id, runs__gte=100).count()
        fifties = MatchDetails.objects.filter(batsman_id=player_id, runs__gte=50, runs__lt=100).count()
        thirties_plus = MatchDetails.objects.filter(batsman_id=player_id, runs__gte=30).count()
        fours = MatchDetails.objects.filter(batsman_id=player_id, runs=4).count()
        sixes = MatchDetails.objects.filter(batsman_id=player_id, runs=6).count()

        stats = {
            'Overall': {
                'matches_played': matches_played,
                'total_runs': total_runs,
                'average_runs': average_runs,
                'best_runs': best_runs,
                'hundreds': hundreds,
                'fifties': fifties,
                'thirties_plus': thirties_plus,
                'fours': fours,
                'sixes': sixes
            },
            '5 overs': {},
            '8 overs': {},
            '10 overs': {},
            '12 overs': {},
            '15 overs': {},
            '20 overs': {},
        }
        return Response({'response': True, 'player_stats': stats})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})

@api_view(['POST'])
def matchDetailsSave(request):
    try:
        serializer = MatchDetailsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'response': True, 'message': 'Saved Successfully.'})
        return Response({'response': False, 'error': serializer.errors})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})
        
@api_view(['GET'])
def pendingRequests(request):
    try:
        tournament_id = request.GET.get('tournament_id')

        pendingRequests = PendingRequest.objects.filter(tournament_id=tournament_id, status=0)
        team_ids = [ObjectId(request.team_id) for request in pendingRequests]
        teams = Team.objects.filter(_id__in=team_ids)

        data = []
        for request in pendingRequests:
            team = teams.get(_id=ObjectId(request.team_id))
            serialized_data = {
                'team_id': request.team_id,
                'team_title': team.title,
                'created_at': request.created_at
            }
            data.append(serialized_data)

        return Response({'response': True, 'pendingRequests': data})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})

@api_view(['POST'])
def pendingRequestSave(request):
    try:
        serializer = PendingRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'response': True, 'message': 'Saved Successfully.'})
        return Response({'response': False, 'error': serializer.errors})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})

@api_view(['PATCH'])
def updatePendingRequest(request):
    try:
        teamId = request.GET.get('teamId')
        if not teamId:
            return Response({'response': False, 'error': 'Team ID not provided.'})
        pendingRequest = PendingRequest.objects.filter(Q(team_id = teamId)).first()
        serializer = PendingRequestSerializer(pendingRequest, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'response': True, 'message': 'Information updated.'})
        return Response({'response': False, 'error': serializer.errors})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})        
        

@api_view(['POST'])
def matchInningsSave(request):
    try:
        match_id = request.data.get('match_id')
        existing_match = MatchInnings.objects.filter(match_id=match_id).exists()

        if existing_match:
            return Response({'response': False, 'error': 'Match ID already exists.'})

        serializer = MatchInningsSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'response': True, 'message': 'Saved Successfully.'})
        return Response({'response': False, 'error': serializer.errors})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})
       

@api_view(['PATCH'])
def matchInningsUpdate(request):
    try:
        match_id = request.GET.get('match_id')
        if not match_id:
            return Response({'response': False, 'error': 'Match ID not provided.'})
        match = MatchInnings.objects.filter(Q(match_id = match_id)).first()
        serializer = MatchInningsSerializer(match, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'response': True, 'message': 'Information updated.'})
        return Response({'response': False, 'error': serializer.errors})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})

@api_view(['GET'])
def get_match_innings(request):
    try:
        match_id = request.GET.get('match_id')
        match_innings = MatchInnings.objects.filter(Q(match_id=match_id))
        serializer = MatchInningsSerializer(match_innings, many=True)
        return Response({'response':True, 'match_innings': serializer.data})
    except:
        return Response({'response':False, 'error': 'Can Not Retrieve Data'})

@api_view(['GET'])
def get_user_details(request):
    try:
        _id = request.GET.get('user_id')
        users = User.objects.filter(Q(username=_id) | Q(_id__isnull=True))
        serializer = UserSerializer(users, many=True)
        return Response({'users': serializer.data})
    except:
        return Response({'error': 'Can Not Retrieve User List'}, status=400)

@api_view(['GET'])
def get_tournament_stats(request):
    try:
        _id = ObjectId(request.GET.get('_id'))
        tournament = Tournament.objects.filter(Q(_id=_id))
        serializer = TournamentSerializer(tournament, many=True)
        return Response({'tournament': serializer.data})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})

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
def get_profile_picture(request):
    try:
        username = request.GET.get('username')
        profile_picture = UserProfilePic.objects.filter(Q(username=username)).first()
        serializer = UserProfilePicSerializer(profile_picture)
        return Response({'response':True, 'profile_picture': serializer.data})
    except:
        return Response({'response':False, 'error': 'Can Not Retrieve Data'})

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
        role_id = request.GET.get('role_id')
        users = User.objects.filter(Q(role_id=role_id) | Q(role_id__isnull=True))
        serializer = UserSerializer(users, many=True)
        return Response({'users': serializer.data})
    except:
        return Response({'error': 'Can Not Retrieve User List'}, status=400)

@api_view(['GET'])
def posts_list_by_user(request):
    try:
        username = request.GET.get('username')
        posts = Post.objects.filter(Q(created_by=username))
        serializer = PostSerializer(posts, many=True)
        return Response({'posts': serializer.data})
    except:
        return Response({'error': 'Can Not Retrieve Posts List'}, status=400)

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
def getUsersNameByUsername(request):
    try:
        username = request.GET.get('username')
        UsersName = User.objects.filter(Q(username=username))
        serializer = UserSerializer(UsersName, many=True)
        return Response({'response': True, 'UsersName': serializer.data})
    except:
        return Response({'response': False, 'error': 'Can Not Retrieve Users Names List'}, status=400)

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
        posts = Post.objects.all().order_by('-created_at')  # Sort posts by 'created_at' field in descending order
        data = []
        for post in posts:
            user = User.objects.get(username=post.created_by)
            try:
                profile_pic = UserProfilePic.objects.get(username=post.created_by)
                profile_pic_url = profile_pic.file_path.url if profile_pic.file_path else None
            except UserProfilePic.DoesNotExist:
                profile_pic_url = None

            # Convert the post's 'created_at' field to the user's timezone (if needed)
            created_at = make_aware(post.created_at) if post.created_at.tzinfo is None else post.created_at

            serialized_post = {
                'title': post.title,
                'description': post.description,
                'file_path': post.file_path.url if post.file_path else None,
                'created_by': user.fullname,
                'created_at': created_at,  # Use the converted 'created_at' field
                'user_profile_picture': profile_pic_url
            }
            data.append(serialized_post)
        return Response({'posts': data})
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
def teams_list_status_active(request):
    try:
        teams = Team.objects.filter(status=1)
        serializer = TeamsSerializer(teams, many=True)
        return Response({'response': True, 'teams': serializer.data})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})

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
            return Response({'response': True, 'message': 'Tournament Saved Successfully'})
        return Response({'response': False, 'error': serializer.errors})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})

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
        return Response({'response': False, 'error': serializer.errors})
    except Exception as e:
        return Response({'response': False, 'error': str(e)}, status=500)
        
@api_view(['POST'])
def userProfileSave(request):
    try:
        username = request.data.get('username')
        existing_user = UserProfilePic.objects.filter(username=username).first()
        if existing_user:
            serializer = UserProfilePicSerializer(existing_user, data=request.data, partial=True)
        else:
            serializer = UserProfilePicSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            if 'file_path' in request.FILES and request.FILES['file_path'] is not None:
                serializer.save(file_path=request.FILES['file_path'])
            elif 'coverPhoto' in request.FILES and request.FILES['coverPhoto'] is not None:
                serializer.save(coverPhoto=request.FILES['coverPhoto'])
            else:
                return Response({'response': False, 'error': 'No file provided'})
            return Response({'response': True, 'message': 'Saved Successfully'})
        return Response({'response': False, 'error': serializer.errors})

    except Exception as e:
        return Response({'response': False, 'error': str(e)})

@api_view(['POST'])
def playersInMatchSave(request):
    try:
        serializer = PlayersInMatchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'response': True, 'message': 'player in match Saved Successfully'}, status=200)
        return Response({'response': False, 'error': serializer.errors})
    except Exception as e:
        return Response({'response': False, 'error': str(e)}, status=500)
    
@api_view(['POST'])
def teamMembersSave(request):
    try:
        serializer = TeamMembersSerializer(data=request.data)
        if serializer.is_valid():
            player_id = serializer.validated_data.get('player_id')
            # Check if player with given player_id already exists in a team
            teamMember_exists = len(TeamMembers.objects.filter(player_id = player_id)) > 0
            if teamMember_exists:
                return Response({'response': False, 'error': 'Player is already in a team'})
            serializer.save()
            return Response({'response': True, 'message': 'Team Member Saved Successfully'})
        return Response({'response': False, 'error': serializer.errors})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})

@api_view(['POST'])
def matchDetailsSave(request):
    try:
        serializer = MatchDetailsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'response': True, 'message': 'Saved Successful.'})
        return Response({'response': False, 'error': serializer.errors})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})

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
        matchId = ObjectId(request.GET.get('matchId'))
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

@api_view(['GET'])
def get_team_members(request):
    try:
        team_members = TeamMembers.objects.all()
        team_member_data = []
        
        for team_member in team_members:
            player_id = team_member.player_id
            team_id = team_member.team_id
            
            # Retrieve player details from the users table
            player = User.objects.filter(_id=ObjectId(player_id)).first()
            player_name = player.fullname if player else None
            
            # Retrieve total runs and balls played from the match details table
            total_runs = MatchDetails.objects.filter(batsman_id=player_id).aggregate(total_runs=Sum('runs')).get('total_runs', 0) or 0
            balls_played = MatchDetails.objects.filter(batsman_id=player_id).count()
            
            # Player Bowler
            balls_bowled = MatchDetails.objects.filter(bowler_id=player_id).count()
            
            # Initialize player type as None
            player_type = None
            
            if(balls_played > 0):
                player_type = 'Batsman'
            else:
                player_type = 'Bowler'
            
            # Calculate the strike rate
            strike_rate = (total_runs / balls_played) * 100 if balls_played else 0
            
            # Retrieve team name from the teams table
            team = Team.objects.filter(_id=ObjectId(team_id)).first()
            team_name = team.title if team else None
            
            # Retrieve distinct match count using the $push and $group stages
            match_count_batsman = MatchDetails.objects.filter(batsman_id=player_id).values('match_id').distinct()
            total_matches_batsman = len(match_count_batsman)
            
            match_count_bowler = MatchDetails.objects.filter(bowler_id=player_id).values('match_id').distinct()
            total_matches_bowler = len(match_count_bowler)
            
            team_member_data.append({
                'player_id': str(player_id),
                'player_name': player_name,
                'player_type': player_type,
                'team_name': team_name,
                'total_runs': total_runs,
                'total_matches_batsman': total_matches_batsman,
                'total_matches_bowler': total_matches_bowler,
                'balls_played': balls_played,
                'balls_bowled': balls_bowled,
                'strike_rate': strike_rate
            })

        return Response({'team_members': team_member_data})
    except Exception as e:
        return Response({'error': str(e)}, status=400)
        
@api_view(['DELETE'])
def delete_team_member(request):
    try:
        player_id = request.GET.get('player_id')
        if not player_id:
            return Response({'response': False, 'error': 'Player ID not provided.'})
        team_member = TeamMembers.objects.filter(player_id=player_id).first()
        if not team_member:
            return Response({'response': False, 'error': 'Player not found.'})
        team_member.delete()
        return Response({'response': True, 'message': 'Player Removed From Team.'})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})
        
@api_view(['DELETE'])
def delete_team(request):
    try:
        _id = ObjectId(request.GET.get('_id'))
        if not _id:
            return Response({'response': False, 'error': 'Team ID not provided.'})
        team = Team.objects.filter(_id=_id).first()
        if not team:
            return Response({'response': False, 'error': 'Team not found.'})
        team.delete()
        return Response({'response': True, 'message': 'Team Deleted.'})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})

@api_view(['DELETE'])
def delete_tournament(request):
    try:
        _id = ObjectId(request.GET.get('_id'))
        if not _id:
            return Response({'response': False, 'error': 'Tournament ID not provided.'})
        tournament = Tournament.objects.filter(_id=_id).first()
        if not tournament:
            return Response({'response': False, 'error': 'Tournament not found.'})
        tournament.delete()
        return Response({'response': True, 'message': 'Tournament Deleted.'})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})
        
@api_view(['DELETE'])
def delete_post(request):
    try:
        _id = ObjectId(request.GET.get('_id'))
        if not _id:
            return Response({'response': False, 'error': 'Post ID not provided.'})
        post = Post.objects.filter(_id=_id).first()
        if not post:
            return Response({'response': False, 'error': 'Post not found.'})
        post.delete()
        return Response({'response': True, 'message': 'Post Deleted.'})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})
        
@api_view(['DELETE'])
def delete_match(request):
    try:
        _id = ObjectId(request.GET.get('_id'))
        if not _id:
            return Response({'response': False, 'error': 'Match ID not provided.'})
        match = Matches.objects.filter(_id=_id).first()
        if not match:
            return Response({'response': False, 'error': 'Match not found.'})
        match.delete()
        return Response({'response': True, 'message': 'Match Deleted.'})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})
        
@api_view(['GET'])
def match_summary_by_id(request):
    try:
        match_id = ObjectId(request.GET.get('match_id'))
        if not match_id:
            return Response({'response': False, 'error': 'Match ID not provided.'})
        match = Matches.objects.filter(match_id = match_id).first()
        if not match:
            return Response({'response': False, 'error': 'Match not found.'})
        match.delete()
        return Response({'response': True, 'message': 'Match Deleted.'})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})
        
@api_view(['GET'])
def get_matches_by_tournament_id(request):
    try:
        tournament_id = request.GET.get('tournament_id')
        match = Matches.objects.filter(Q(tournament_id=tournament_id))
        serializer = MatchSerializer(match, many=True)
        return Response({'response': True, 'matches': serializer.data})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})
        
@api_view(['GET'])
def get_teams_by_match_id(request):
    try:
        match_id = ObjectId(request.GET.get('_id'))
        match = Matches.objects.get(_id=match_id)
        team1 = Team.objects.get(_id=ObjectId(match.team_id1))
        team2 = Team.objects.get(_id=ObjectId(match.team_id2))
        teams = [team1.title, team2.title]
        return Response({'response': True, 'teams': teams})
    except Matches.DoesNotExist:
        return Response({'response': False, 'error': 'Match not found'})
    except Team.DoesNotExist:
        return Response({'response': False, 'error': 'Team not found'})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})

@api_view(['GET'])
def get_match_details_by_match_id(request):
    try:
        match_id = request.GET.get('match_id')
        match_details = MatchDetails.objects.filter(match_id=match_id)
        serialized_match_details = MatchDetailsSerializer(match_details, many=True).data

        player_details = []

        for match_detail in serialized_match_details:
            batsman_id = match_detail['batsman_id']
            bowler_id = match_detail['bowler_id']

            batsman = User.objects.get(_id=ObjectId(batsman_id))
            bowler = User.objects.get(_id=ObjectId(bowler_id))

            player_detail = {
                'batsman_name': batsman.fullname,
                'runs': match_detail['runs'],
                'bowler_name': bowler.fullname,
                'wickets': match_detail['wickets'],
                'innings': match_detail['innings'],
                'extras': match_detail['extras'],
                'outOption': match_detail['outOption'],
                'current_over': match_detail['current_over'],
                'current_ball': match_detail['current_ball'],
            }

            player_details.append(player_detail)

        return Response({'response': True, 'player_details': player_details})
    except MatchDetails.DoesNotExist:
        return Response({'response': False, 'error': 'Match details not found'})
    except User.DoesNotExist:
        return Response({'response': False, 'error': 'User not found'})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})

@api_view(['GET'])
def get_team_players_by_team_id(request):
    try:
        team_id = request.GET.get('team_id')
        team_members = TeamMembers.objects.filter(team_id=team_id)
        player_ids = [member.player_id for member in team_members]
        player_object_ids = [ObjectId(pid) for pid in player_ids]
        players = User.objects.filter(_id__in=player_object_ids)
        
        # Prepare a list of dictionaries containing IDs and names of team members
        team_members_data = [{'_id': str(player._id), 'fullname': player.fullname} for player in players]
        
        return Response({'response': True, 'team_members': team_members_data})
    except Exception as e:
        return Response({'response': False, 'error': str(e)})

@api_view(['GET'])
def get_tournament_schedule(request):
    try:
        tournament_id = request.GET.get('tournament_id')

        # Retrieve matches for the given tournament
        matches = Matches.objects.filter(tournament_id=tournament_id)

        schedule = []

        for match in matches:
            team1 = Team.objects.get(_id=ObjectId(match.team_id1))
            team2 = Team.objects.get(_id=ObjectId(match.team_id2))

            # Prepare schedule entry
            entry = {
                'team1': team1.title,
                'team2': team2.title,
                'date': match.start_date.strftime('%Y-%m-%d'),
                'time': match.start_time.strftime('%H:%M'),
            }

            schedule.append(entry)

        return Response({'response': True, 'schedule': schedule})

    except Exception as e:
        return Response({'response': False, 'error': str(e)})

@api_view(['GET'])
def get_tournament_stats(request):
    try:
        tournament_id = request.GET.get('tournament_id')

        # Retrieve team IDs from pending requests for the given tournament ID
        pending_requests = PendingRequest.objects.filter(tournament_id=tournament_id, status=1)
        serialized_pending_requests = PendingRequestSerializer(pending_requests, many=True).data

        team_stats = {}  # Initialize an empty dictionary

        serialized_teams = []  # Store serialized teams data in a list
        
        for pr in serialized_pending_requests:
            team_id = ObjectId(pr['team_id'])
            # Filter teams based on the retrieved team IDs
            teams = Team.objects.filter(_id=team_id)

            serialized_team = TeamsSerializer(teams[0]).data  # Assuming there's only one team for each ID
            serialized_teams.append(serialized_team)

            # Initialize team statistics dictionary with team IDs as keys
            team_stats[team_id] = {
                'team_title': serialized_team['title'],
                'total_matches': 0,
                'won_matches': 0,
                'lost_matches': 0,
                'runs': 0,
                'ratings': 0
            }

        # Rest of the code remains the same

        # Calculate lost matches count for each team
        for team_id, stats in team_stats.items():
            stats['lost_matches'] = stats['total_matches'] - stats['won_matches']

        # Prepare the final response with team statistics
        response = list(team_stats.values())

        return Response({'response': True, 'team_stats': response})

    except Exception as e:
        return Response({'response': False, 'error': str(e)})


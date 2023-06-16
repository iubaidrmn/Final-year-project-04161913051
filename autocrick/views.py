from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *
from django.db.models import Q
from bson import ObjectId

# @api_view(['GET'])
# def user_list(request):
#     try:
#         users = User.objects.all()
#         serializer = UserSerializer(users, many=True)
#         return Response({'users': serializer.data})
#     except:
#         return Response({'error': 'Can Not Retrieve User List'}, status=400)

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
        coach_id = request.GET.get('coach_id')  # Get the coach_id from the request query parameters
        coach_id = ObjectId(coach_id)
        coachNames = User.objects.filter(Q(_id=coach_id))
        serializer = UserSerializer(coachNames, many=True)
        return Response({'coachNames': serializer.data})
    except:
        return Response({'error': 'Can Not Retrieve Teams List'}, status=400)


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
            serializer.save()
            return Response({'response': True, 'message': 'Registration Successful.'}, status=200)
        return Response({'response': False, 'error': serializer.errors}, status=400)
    except Exception as e:
        return Response({'response': False, 'error': str(e)}, status=500)

@api_view(['POST'])
def tournamentSave(request):
    try:
        serializer = TournamentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
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
            serializer.save()
            return Response({'response': True, 'message': 'Post Saved Successfully'}, status=200)
        return Response({'response': False, 'error': serializer.errors}, status=400)
    except Exception as e:
        return Response({'response': False, 'error': str(e)}, status=500)

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
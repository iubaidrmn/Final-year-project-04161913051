from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *

@api_view(['GET'])
def user_list(request):
    try:
        users = User.objects.all().values()
        return Response({'users': list(users)})
    except:
        return Response({'error': 'Can Not Retrieve User List'}, status=400)

@api_view(['GET'])
def roles_list(request):
    try:
        roles = Role.objects.all().values()
        return Response({'roles': list(roles)})
    except:
        return Response({'error': 'Can Not Retrieve Roles List'}, status=400)

@api_view(['GET'])
def tournament_list(request):
    try:
        tournaments = Tournament.objects.all().values()
        return Response({'tournaments': list(tournaments)})
    except:
        return Response({'error': 'Can Not Retrieve Tournament List'}, status=400)


@api_view(['GET'])
def matches_list(request):
    try:
        matches = Matches.objects.all().values()
        return Response({'matches': list(matches)})
    except:
        return Response({'error': 'Can Not Retrieve Matches List'}, status=400)


@api_view(['GET'])
def player_in_match_list(request):
    try:
        players_in_match = Players_in_Match.objects.all().values()
        return Response({'players_in_match': list(players_in_match)})
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
    # Extract data from request
    fullname = request.data.get('fullname')
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    contact_no = request.data.get('contact_no')
    role_id = request.data.get('role_id')
    created_at = request.data.get('created_at')
    try:
        # Check if the username already exists
        if User.objects.filter(username=username).exists():
            return Response({'response': False, 'error': 'Username already exists'}, status=400)
        # Check if the email already exists
        if User.objects.filter(email=email).exists():
            return Response({'response': False, 'error': 'Email already exists'}, status=400)
        # Create a new user
        user = User(fullname=fullname, username=username, email=email, password=password,
            contact_no=contact_no, role_id=role_id, created_at=created_at,)
        # Save the user to the database
        user.save()
        return Response({'response': True, 'message': 'Signup successful'}, status=200)
    except Exception as e:
        return Response({'response': False, 'error': 'Username / Email Exisit. Try Again!'})


@api_view(['POST'])
def tournamentSave(request):
    # Extract data from request
    title = request.data.get('title')
    description = request.data.get('description')
    no_of_matches = request.data.get('no_of_matches')
    # lat , lon
    venue = request.data.get('venue')
    start_date = request.data.get('start_date')
    end_date = request.data.get('end_date')
    status = request.data.get('status')
    created_at = request.data.get('created_at')
    try:
        # Create a new tournament
        tournament = Tournament(
            title = title,
            description = description,
            no_of_matches = no_of_matches,
            venue = venue,
            start_date = start_date,
            end_date = end_date,
            status = status,
            created_at = created_at,)
        
        # Save the Tournament to the database
        tournament.save()
        return Response({'response': True, 'message': 'Tournament Saved Successfully'}, status=200)
    except Exception as e:
        return Response({'response': False, 'error': 'Something Went Wrong.. Try Again!'})

@api_view(['POST'])
def matchSave(request):
    # Extract data from request
    tournament_id = request.data.get('tournament_id')
    title = request.data.get('title')
    description = request.data.get('description')
    start_date = request.data.get('start_date')
    end_date = request.data.get('end_date')
    status = request.data.get('status')
    created_at = request.data.get('created_at')
    try:
        # Create a new Match
        match = Matches(
            tournament_id = tournament_id,
            title = title,
            description = description,
            start_date = start_date,
            end_date = end_date,
            status = status,
            created_at = created_at,)
        
        # Save the Match to the database
        match.save()
        return Response({'response': True, 'message': 'Match Saved Successfully'}, status=200)
    except Exception as e:
        return Response({'response': False, 'error': 'Something Went Wrong.. Try Again!'})
    
@api_view(['POST'])
def playersInMatchSave(request):
    # Extract data from request
    user_id = request.data.get('user_id')
    match_id = request.data.get('match_id')
    try:
        # Create a new Match
        players_in_match = Players_in_Match(
            user_id = user_id,
            match_id = match_id,)
        
        # Save the Players in  Match to the database
        players_in_match.save()
        return Response({'response': True, 'message': 'Players in Match Saved Successfully'}, status=200)
    except Exception as e:
        return Response({'response': False, 'error': 'Something Went Wrong.. Try Again!'})
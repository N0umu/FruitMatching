
const initialState = {leaderboard: []}

function leaderboardReducer(state = initialState, action) {
    let nextState
    switch (action.type) {

            case 'LEADERBOARD':
                nextState = {
                    ... state,
                    leaderboard: [...state.leaderboard, action.value]
                }
                return nextState
            default:
                return state
    }
}

export default leaderboardReducer

const initialState = {currentU: {}}

function userReducer(state = initialState, action) {
    let nextState
    switch (action.type) {

            case 'CURRENT_USER':
                nextState = {
                    ... state,
                    currentU: action.value
                }
                return nextState
            case 'DELETE_C_USER':
                nextState = {
                    ... state,
                    currentU: {}
                }
                return nextState

            default:
                return state
    }
}

export default userReducer
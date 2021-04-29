interface ActionProps {
    type: string;
    payload: any;
}

interface StateProps {
    data: null;
}

const initialState: StateProps = {
    data: null
}

export const rootReducer = (state = initialState, action: ActionProps): StateProps => {
    switch (action.type) {
        default:
            return state;
    }
}

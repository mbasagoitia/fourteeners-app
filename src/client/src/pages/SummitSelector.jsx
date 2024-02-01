import UserForm from "../components/UserForm";

function SummitSelector ({ user, onLoginRedirect }) {
    return (
        <div className="content-container">
            <div className="overlay-container">
                <div className="form-overlay-box">
                    <UserForm user={user} onLoginRedirect={onLoginRedirect} />
                </div>
            </div>
        </div>
    )
}

export default SummitSelector;
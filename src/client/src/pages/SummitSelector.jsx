import UserForm from "../components/UserForm";

function SummitSelector ({ user, onLoginRedirect }) {
    return (
    <div className="form-overlay-container">
        <div className="form-overlay-box">
            <UserForm user={user} onLoginRedirect={onLoginRedirect} />
        </div>
    </div>
    )
}

export default SummitSelector;
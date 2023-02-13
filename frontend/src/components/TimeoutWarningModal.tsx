import React from "react";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "500px",
        width: "100%",
        padding: "50px",
        fontSize: "20px"
    }
};

interface TimeoutWarningModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export const TimeoutWarningModal: React.FC<TimeoutWarningModalProps> = ({
    isOpen,
    onRequestClose
}) => {
    const onLogOffCall = () => {
        // Implement your logout functionality here, e.g. clear the users login cache or hit your signout server
        localStorage.clear();
        window.location.href = "/";
    };

    return (
        <div>
            <Modal
                isOpen={isOpen}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2>Session Timeout</h2>
                <div>
                    You're being timed out due to inactivity. Please choose to stay
                    signed in or to logoff. Otherwise, you will be logged off
                    automatically
                </div>
                <br />
                <button onClick={onLogOffCall}>Log off</button>
                <button onClick={onRequestClose}>Stay Logged In</button>
            </Modal>
        </div>
    );
};

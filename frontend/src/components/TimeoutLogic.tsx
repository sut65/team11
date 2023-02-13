import React, { useEffect, useState } from "react";
import { TimeoutWarningModal } from "./TimeoutWarningModal"
import { addEventListeners, removeEventListeners } from "./until/eventListenerUtil";





const TimeoutLogic = () => {
    const [isWarningModalOpen, setWarningModalOpen] = useState(false);

    useEffect(() => {
        const createTimeout1 = () =>
            setTimeout(() => {
                setWarningModalOpen(true);
            }, 3600000);

        const createTimeout2 = () =>
            setTimeout(() => {
                // Implement a sign out function here
                localStorage.clear();
                window.location.href = "/";
            }, 3660000);

        const listener = () => {
            if (!isWarningModalOpen) {
                clearTimeout(timeout);
                timeout = createTimeout1();
            }
        };

        // Initialization
        let timeout = isWarningModalOpen ? createTimeout2() : createTimeout1();
        addEventListeners(listener);

        // Cleanup
        return () => {
            removeEventListeners(listener);
            clearTimeout(timeout);
        };
    }, [isWarningModalOpen]);



    return (
        <div>
            {isWarningModalOpen && (
                <TimeoutWarningModal
                    isOpen={isWarningModalOpen}
                    onRequestClose={() => setWarningModalOpen(false)}
                />
            )
            }
        </div>

    );

}

export default TimeoutLogic;

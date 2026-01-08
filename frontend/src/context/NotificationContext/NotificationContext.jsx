import React, { createContext, useContext, useState } from "react";
import "./Notification.css";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  // Close notification with scaleOut animation
  const closeNotification = () => {
    setNotification((prev) => prev && { ...prev, closing: true });
    setTimeout(() => setNotification(null), 350); // match scaleOut duration
  };

  // Map type to icon
  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <FaCheckCircle />;
      case "error":
        return <FaTimesCircle />;
      case "warning":
        return <FaExclamationTriangle />;
      default:
        return null;
    }
  };

  // Map type to action label
  const getActionLabel = (type) => {
    switch (type) {
      case "success":
        return "Proceed";
      case "error":
        return "Retry";
      case "warning":
        return "Recheck";
      default:
        return "OK";
    }
  };

  /**
   * Blocking notification
   * Returns a Promise that resolves when user clicks the action button
   */
  const showBlockingNotification = ({ type = "success", title, message }) => {
    return new Promise((resolve) => {
      setNotification({
        type,
        title,
        message,
        closing: false,
        onAction: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });
  };

  /**
   * Non-blocking notification
   */
  const showNotification = ({ type = "info", title, message, duration = 4000 }) => {
    setNotification({ type, title, message, closing: false });
    setTimeout(() => closeNotification(), duration);
  };

  return (
    <NotificationContext.Provider value={{ showNotification, showBlockingNotification }}>
      {children}

      {notification && (
        <div className="notify-overlay">
          <div
            className={`notify-popup ${notification.type} ${
              notification.closing ? "fade-out" : ""
            }`}
          >
            <div className="notify-icon">{getIcon(notification.type)}</div>

            {notification.title && (
              <h3 className="notify-title">{notification.title}</h3>
            )}

            <p className="notify-message">{notification.message}</p>

            <div className="notify-actions">
              {notification.onAction && (
                <button
                  className="notify-btn primary"
                  onClick={() => {
                    notification.onAction?.();
                    closeNotification();
                  }}
                >
                  {getActionLabel(notification.type)}
                </button>
              )}

              {notification.onCancel && (
                <button
                  className="notify-btn secondary"
                  onClick={() => {
                    notification.onCancel?.();
                    closeNotification();
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

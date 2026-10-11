import { useState } from "react";
import type { ChangeEvent, ReactNode } from "react";
import AuthField from "../../components/Auth/AuthField";
import { brand } from "../../data/brand";
import { MIN_PASSWORD_LENGTH } from "../../utils/validation";

interface AccountSettings {
  language: string;
  currency: string;
}

type NotificationSettings = Record<"confirmations" | "offers" | "reminders", boolean>;

interface PasswordValues {
  current: string;
  next: string;
  confirm: string;
}

type PasswordErrors = Partial<Record<keyof PasswordValues, string>>;

const languageOptions = ["English", "Arabic", "French"];
const currencyOptions = ["USD", "EUR", "GBP"];

const notificationOptions: {
  name: keyof NotificationSettings;
  label: string;
  description: string;
}[] = [
  {
    name: "confirmations",
    label: "Booking confirmations",
    description: "Get an email when a booking is confirmed or changed.",
  },
  {
    name: "reminders",
    label: "Stay reminders",
    description: "Receive a reminder before your check-in date.",
  },
  {
    name: "offers",
    label: "Offers and news",
    description: `Hear about special offers and updates from ${brand.name}.`,
  },
];

// UI-only validation, no password is changed
function validatePassword(values: PasswordValues): PasswordErrors {
  const errors: PasswordErrors = {};

  if (!values.current) {
    errors.current = "Please enter your current password.";
  }

  if (!values.next) {
    errors.next = "Please enter a new password.";
  } else if (values.next.length < MIN_PASSWORD_LENGTH) {
    errors.next = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }

  if (!values.confirm) {
    errors.confirm = "Please confirm your new password.";
  } else if (values.confirm !== values.next) {
    errors.confirm = "Passwords do not match.";
  }

  return errors;
}

const styles = `
.gh-settings {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.gh-settings__section {
  padding: 32px;
}
.gh-settings__title {
  margin: 0 0 6px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 22px;
  font-weight: 700;
  color: #04364F;
}
.gh-settings__text {
  margin: 0 0 24px;
  font-size: 15px;
  line-height: 1.6;
  color: #04364F;
}
.gh-settings__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.gh-settings__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}
.gh-settings__checks {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.gh-settings__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

@media (max-width: 640px) {
  .gh-settings__section {
    padding: 24px 20px;
  }
  .gh-settings__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
`;

interface SettingsSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <section className="gh-dash__card gh-settings__section">
      <h2 className="gh-settings__title">{title}</h2>
      <p className="gh-settings__text">{description}</p>
      {children}
    </section>
  );
}

function Settings() {
  const [account, setAccount] = useState<AccountSettings>({
    language: "English",
    currency: "USD",
  });
  const [accountSaved, setAccountSaved] = useState(false);

  const [notifications, setNotifications] = useState<NotificationSettings>({
    confirmations: true,
    reminders: true,
    offers: false,
  });
  const [notificationsSaved, setNotificationsSaved] = useState(false);

  const [password, setPassword] = useState<PasswordValues>({
    current: "",
    next: "",
    confirm: "",
  });
  const [passwordSubmitted, setPasswordSubmitted] = useState(false);

  const passwordErrors = passwordSubmitted ? validatePassword(password) : {};
  const isPasswordValid =
    passwordSubmitted && Object.keys(passwordErrors).length === 0;

  const handleAccountChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setAccount((previous) => ({ ...previous, [name]: value }));
    setAccountSaved(false);
  };

  const handleNotificationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setNotifications((previous) => ({ ...previous, [name]: checked }));
    setNotificationsSaved(false);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPassword((previous) => ({ ...previous, [name]: value }));
  };

  return (
    <>
      <style>{styles}</style>
      <div>
        <header className="gh-dash__page-head">
          <h1 className="gh-dash__page-title">Settings</h1>
          <p className="gh-dash__page-text">
            Manage your account, notifications and security.
          </p>
        </header>

        <div className="gh-settings">
          <SettingsSection
            title="Account Settings"
            description="Choose your preferred language and currency."
          >
            <form
              className="gh-settings__form"
              onSubmit={(event) => {
                event.preventDefault();
                setAccountSaved(true);
              }}
            >
              <div className="gh-settings__grid">
                <div className="gh-auth__field">
                  <label className="gh-auth__label" htmlFor="gh-settings-language">
                    Language
                  </label>
                  <select
                    id="gh-settings-language"
                    name="language"
                    className="gh-auth__input"
                    value={account.language}
                    onChange={handleAccountChange}
                  >
                    {languageOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="gh-auth__field">
                  <label className="gh-auth__label" htmlFor="gh-settings-currency">
                    Currency
                  </label>
                  <select
                    id="gh-settings-currency"
                    name="currency"
                    className="gh-auth__input"
                    value={account.currency}
                    onChange={handleAccountChange}
                  >
                    {currencyOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="gh-settings__actions">
                <button type="submit" className="gh-dash__btn">
                  Save Changes
                </button>
              </div>
              {accountSaved && (
                <p className="gh-dash__notice" role="status">
                  Saved for this session only. Saving will be available in a
                  later step.
                </p>
              )}
            </form>
          </SettingsSection>

          <SettingsSection
            title="Notification Preferences"
            description="Choose which emails you would like to receive."
          >
            <form
              className="gh-settings__form"
              onSubmit={(event) => {
                event.preventDefault();
                setNotificationsSaved(true);
              }}
            >
              <div className="gh-settings__checks">
                {notificationOptions.map((option) => (
                  <label key={option.name} className="gh-dash__check">
                    <input
                      type="checkbox"
                      name={option.name}
                      checked={notifications[option.name]}
                      onChange={handleNotificationChange}
                    />
                    <span>
                      {option.label}
                      <small>{option.description}</small>
                    </span>
                  </label>
                ))}
              </div>
              <div className="gh-settings__actions">
                <button type="submit" className="gh-dash__btn">
                  Save Preferences
                </button>
              </div>
              {notificationsSaved && (
                <p className="gh-dash__notice" role="status">
                  Saved for this session only. Saving will be available in a
                  later step.
                </p>
              )}
            </form>
          </SettingsSection>

          <SettingsSection
            title="Security"
            description="Update your password to keep your account secure."
          >
            <form
              className="gh-settings__form"
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
                setPasswordSubmitted(true);
              }}
            >
              <AuthField
                id="gh-settings-current"
                label="Current Password"
                name="current"
                type="password"
                autoComplete="current-password"
                value={password.current}
                onChange={handlePasswordChange}
                error={passwordErrors.current}
              />
              <div className="gh-settings__grid">
                <AuthField
                  id="gh-settings-new"
                  label="New Password"
                  name="next"
                  type="password"
                  autoComplete="new-password"
                  hint={`Use at least ${MIN_PASSWORD_LENGTH} characters.`}
                  value={password.next}
                  onChange={handlePasswordChange}
                  error={passwordErrors.next}
                />
                <AuthField
                  id="gh-settings-confirm"
                  label="Confirm New Password"
                  name="confirm"
                  type="password"
                  autoComplete="new-password"
                  value={password.confirm}
                  onChange={handlePasswordChange}
                  error={passwordErrors.confirm}
                />
              </div>
              <div className="gh-settings__actions">
                <button type="submit" className="gh-dash__btn">
                  Update Password
                </button>
              </div>
              {isPasswordValid && (
                <p className="gh-dash__notice" role="status">
                  Your details look good. Password change will be available in
                  a later step.
                </p>
              )}
            </form>
          </SettingsSection>
        </div>
      </div>
    </>
  );
}

export default Settings;
import { useState } from "react";
import type { ChangeEvent } from "react";
import AuthField from "../../components/Auth/AuthField";
import { useAuthStore } from "../../store/authStore";
import type { UserProfile } from "../../types/dashboard";
import { getInitials } from "../../utils/user";
import { getUserProfile } from "../../utils/userProfile";
import { isValidEmail } from "../../utils/validation";

type ProfileErrors = Partial<Record<"fullName" | "email", string>>;

const emptyProfile: UserProfile = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
};

// UI-only validation, nothing is saved to a backend
function validate(values: UserProfile): ProfileErrors {
  const errors: ProfileErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  return errors;
}

const styles = `
.gh-profile__card {
  padding: 32px;
}
.gh-profile__summary {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #EFEFF2;
}
.gh-profile__summary > div {
  min-width: 0;
}
.gh-profile__card .gh-profile__avatar {
  width: 72px;
  height: 72px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 24px;
}
.gh-profile__name {
  margin: 0 0 4px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 22px;
  font-weight: 700;
  color: #04364F;
  overflow-wrap: anywhere;
}
.gh-profile__email {
  margin: 0;
  font-size: 15px;
  color: #93979A;
  overflow-wrap: anywhere;
}
.gh-profile__list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  margin: 0 0 32px;
}
.gh-profile__label {
  margin-bottom: 6px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #93979A;
}
.gh-profile__value {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #04364F;
  overflow-wrap: anywhere;
}
.gh-profile__form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.gh-profile__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}
.gh-profile__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.gh-profile__notice {
  margin-top: 24px;
}

@media (max-width: 640px) {
  .gh-profile__card {
    padding: 24px 20px;
  }
  .gh-profile__list,
  .gh-profile__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 480px) {
  .gh-profile__summary {
    gap: 16px;
  }
  .gh-profile__card .gh-profile__avatar {
    width: 56px;
    height: 56px;
    font-size: 20px;
  }
  .gh-profile__name {
    font-size: 20px;
  }
}
`;

function Profile() {
  const user = useAuthStore((state) => state.user);
  const [profile, setProfile] = useState<UserProfile>(() =>
    user ? getUserProfile(user) : emptyProfile,
  );
  const [values, setValues] = useState<UserProfile>(() =>
    user ? getUserProfile(user) : emptyProfile,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [wasSaved, setWasSaved] = useState(false);

  const errors = hasSubmitted ? validate(values) : {};

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  };

  const startEditing = () => {
    setValues(profile);
    setHasSubmitted(false);
    setWasSaved(false);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setHasSubmitted(false);
    setIsEditing(false);
  };

  const handleSubmit = () => {
    setHasSubmitted(true);
    if (Object.keys(validate(values)).length === 0) {
      setProfile(values);
      setHasSubmitted(false);
      setIsEditing(false);
      setWasSaved(true);
    }
  };

  const details = [
    { label: "Full Name", value: profile.fullName },
    { label: "Email", value: profile.email },
    { label: "Phone", value: profile.phone },
    { label: "Country", value: profile.country },
  ];

  return (
    <>
      <style>{styles}</style>
      <div>
        <header className="gh-dash__page-head">
          <h1 className="gh-dash__page-title">Profile</h1>
          <p className="gh-dash__page-text">
            Manage your personal information.
          </p>
        </header>

        <section
          className="gh-dash__card gh-profile__card"
          aria-label="Profile details"
        >
          <div className="gh-profile__summary">
            <span
              className="gh-dash__avatar gh-profile__avatar"
              aria-hidden="true"
            >
              {getInitials(profile.fullName)}
            </span>
            <div>
              <p className="gh-profile__name">{profile.fullName}</p>
              <p className="gh-profile__email">{profile.email}</p>
            </div>
          </div>

          {isEditing ? (
            <form
              className="gh-profile__form"
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
            >
              <div className="gh-profile__grid">
                <AuthField
                  id="gh-profile-name"
                  label="Full Name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  value={values.fullName}
                  onChange={handleChange}
                  error={errors.fullName}
                />
                <AuthField
                  id="gh-profile-email"
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <AuthField
                  id="gh-profile-phone"
                  label="Phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={handleChange}
                />
                <AuthField
                  id="gh-profile-country"
                  label="Country"
                  name="country"
                  type="text"
                  autoComplete="country-name"
                  value={values.country}
                  onChange={handleChange}
                />
              </div>
              <div className="gh-profile__actions">
                <button type="submit" className="gh-dash__btn">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="gh-dash__btn gh-dash__btn--outline"
                  onClick={cancelEditing}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <dl className="gh-profile__list">
                {details.map((detail) => (
                  <div key={detail.label}>
                    <dt className="gh-profile__label">{detail.label}</dt>
                    <dd className="gh-profile__value">{detail.value || "—"}</dd>
                  </div>
                ))}
              </dl>
              <button type="button" className="gh-dash__btn" onClick={startEditing}>
                Edit Profile
              </button>
              {wasSaved && (
                <p
                  className="gh-dash__notice gh-profile__notice"
                  role="status"
                >
                  Profile updated for this session only. Saving will be
                  available in a later step.
                </p>
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
}

export default Profile;
# Dino HR

There are three visible types in this HR management back-end segment. They are employees, administrators, and super admin. Super Admin administrators oversee the administration chain and ensure all HR procedures are carried out correctly.  Each employee's work is completely under the administrator's supervision. The back end has completed both the pagination and authentication tasks. additionally, the email otp and the Forget password, make a new password. From the back end, all of these tasks have been completed.

# Tech Stack
![Logo]()

# Features
## User

- User can login, signup and log out.
- User can manage and update their profile.
- Users can give reviews and ratings for services.
- User can view booking history, check booking statuses.
- Feedback forms for users to submit comments and suggestions.

## Employee

- Employees can log in, sign up, and log out securely.
- Employees have access to manage and update their professional profiles.
- Employees can log their daily attendance 
- Employees can apply for different types of leave via this Back-end system.
- Employees have the ability to provide feedback, ratings, and reviews.


## Admin

- Admins are  made by Super Admin.
- Admin can log in and log out.
- Admin can manage and update their profile.
- Admins can add, edit, and manage Employees accounts.
- Admins can view, edit, delete and manage user requests.
- Admin can log his daily attendance, and view his and all enployee attendance..
- Admins can accept, reject, or adjust event schedules as needed.

## Super Admin
- Super Admin can log in and log out.
- Super Admin can manage and update their profile.
- Super Admin can add new admin users to the clients who take our service.
- Super admin can remove admin account after expiry.


# API Endpoints

User Api

```
GET /users
GET /users/:id
GET /users/my-team
post /users
PATCH /users/:id
PATCH /users/my-profile
DELETE /users/:id

```
Auth Api

```
post /login
post /change-password
```
Appointment 

```
get /appointment
get /appointment/:id
post /appointment
PATCH /appointment/:id


```
Attendance

```
get /attendance
get /attendance/:id
post /attendance
PATCH /attendance/:id
```
Event

```
get /event
get /event/:id
post /event
PATCH /event/:id
DELETE /event/:id
```
Feedback

```
get /feedback
get /feedback/:id
post /feedback
```
Leave

```
get /leave
get /leave/:id
get /view/:id
post /leave
PATCH /update/leave/:id
```
Notification

```
get /notification
get /getUnreadCount/notification
post /notification
get /getUnreadCount/notification
DELETE /notification
```
Organization

```
get /organization
get /organization/:id
post /organization
PATCH /organization/:id
DELETE /organization/:id
```
OTP

```
post /otp
post /send-otp/otp
post /verify-otp/otp
```
Address

```
get /address
```

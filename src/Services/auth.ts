import { Deferred } from "./deferred";
import { Auth } from "./firebase";

export async function firebaseSignUp(email: string, password: string) {
  const deferred = new Deferred();

  Auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      deferred.resolve(user.user);
    })
    .catch((err) => {
      deferred.reject(err);
    });
  return deferred.promise;
}

export async function firebaseSignIn(email: string, password: string) {
  const deferred = new Deferred();

  Auth.signInWithEmailAndPassword(email, password)
    .then((user) => {
      deferred.resolve(user.user);
    })
    .catch((err) => {
      deferred.reject(err);
    });
  return deferred.promise;
}

export async function firebaseSendEmailForgotPassword(email: string) {
  const deferred = new Deferred();
  Auth.sendPasswordResetEmail(email)
    .then(() => {
      deferred.resolve("mail sent");
    })
    .catch((err) => {
      deferred.reject(err);
    });
  return deferred.promise;
}

export function firebaseSignOut() {
  Auth.signOut();
}

import { doc, getDoc, updateDoc } from "firebase/firestore";
import dayjs from "dayjs";
import { auth, db } from "../service/firebaseconfig";

export const updateStreak = async (actionType) => {
  if (!auth.currentUser) return;

  const userRef = doc(db, "users", auth.currentUser.uid);
  const userDoc = await getDoc(userRef);
  const userData = userDoc.data();

  const currentDate = dayjs();
  const lastActive = userData.lastActiveDate
    ? dayjs(userData.lastActiveDate)
    : null;

  let newStreak = userData.currentStreak || 0;
  let completedDates = userData.completedDates || [];

  // Add current date to completed dates if not already present
  const currentDateString = currentDate.format("YYYY-MM-DD");
  if (!completedDates.includes(currentDateString)) {
    completedDates.push(currentDateString);
  }

  // Streak logic
  if (
    !lastActive ||
    currentDate.diff(lastActive, "day") === 1 ||
    (currentDate.diff(lastActive, "day") === 0 && !userData.streakUpdatedToday)
  ) {
    newStreak += 1;
  } else if (currentDate.diff(lastActive, "day") > 1) {
    newStreak = 1;
  }

  // Update Firestore
  await updateDoc(userRef, {
    lastActiveDate: currentDateString,
    currentStreak: newStreak,
    completedDates: completedDates,
    streakUpdatedToday: true,
    [`lastActionType_${actionType}`]: currentDateString,
  });

  return newStreak;
};

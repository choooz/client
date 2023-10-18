// male이 들어오면 남, female이 들어오면 여 리턴
export const convertGender = (gender: string) => {
  if (gender === 'MALE') {
    return '남';
  }
  return '여';
};

// age = teenager, twenties, thirties, fourties, fifties
export const convertAge = (age: string) => {
  if (age === 'teenager') {
    return '10대';
  }
  if (age === 'twenties') {
    return '20대';
  }
  if (age === 'thirties') {
    return '30대';
  }
  if (age === 'fourties') {
    return '40대';
  }
  return '50대';
};

// lever = HIGH, MEDIUM, LOW
export const convertLevel = (level: string) => {
  if (level === 'HIGH') {
    return 'Lv.3';
  }
  if (level === 'MEDIUM') {
    return 'Lv.2';
  }
  return 'Lv.1';
};

function compareArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every(function (element, index) {
    return element === arr2[index];
  });
}

function getUsersNamesInAgeRange(users, gender) {
  const filteredUsers = users.filter(function (user) {
    return user.gender === gender;
  });

  if (filteredUsers.length === 0) {
    return 0;
  }

  const ages = filteredUsers.map(function (user) {
    return user.age;
  });

  const sum = ages.reduce(function (acc, age) {
    return acc + age;
  }, 0);

  return sum / ages.length;
}
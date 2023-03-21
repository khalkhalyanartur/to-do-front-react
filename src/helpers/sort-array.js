const sortArray = (array) => {
  const res = [...array].sort((x, y) => x.isCheck >= y.isCheck ? 1 : -1);

  return res
}

export default sortArray
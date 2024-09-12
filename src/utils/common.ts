export const formatExtractLinev2 = (ingredientExtract: any[], currentPosition: number) => {
  const body: any[] = ingredientExtract.map((itemLine, index) => {
    const { parsed_data } = itemLine;
    return {
      parsedQuery: parsed_data.parsed_query,
      position: currentPosition + index,
      rawQuantity: parsed_data.quantity,
      suggestion: parsed_data.name,
      type: parsed_data.type,
      unit: parsed_data.unit,
      yieldDescription: parsed_data.preparation_note,
      recipeLineParserId: parsed_data.recipe_line_parser_id
    };
  });

  return body.filter((el) => el.type?.toUpperCase() !== 'HEADER');
};

export function getNumberFromString(inputString: string) {
  const match = /\d+/.exec(inputString); // Tìm chuỗi số trong chuỗi
  if (match) {
    const number = parseInt(match[0], 10); // Chuyển kết quả thành số nguyên
    return number;
  } else {
    return null; // Trả về null nếu không tìm thấy số trong chuỗi
  }
}


export function changeArrayMethodToStringMethod(arr: { text: string; type: string }[]) {
  const newArr: string[] = [];
  for (const i of arr) {
    if (i.type?.toUpperCase() !== 'HEADER') {
      newArr.push(`<p>${i.text}</p> `);
    }
  }

  return newArr.join('');
}

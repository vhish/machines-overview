import React from "react";

interface Props extends React.HTMLAttributes<HTMLSelectElement> {
  options: Array<string>;
}

function Select(props: Props) {
  const { options, ...rest } = props;
  const optionsMap = options.map((option) => <option>{option}</option>);

  return <select {...rest}>{optionsMap}</select>;
}

export default Select;

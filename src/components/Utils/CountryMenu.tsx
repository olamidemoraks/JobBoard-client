import useCountry from "@/hooks/useCountry";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useMemo, memo } from "react";
import countries from "world-countries";

type CountryMenuProps = {
  setCountryOption: (value: string) => void;
  text?: string;
};

const CountryMenu: React.FC<CountryMenuProps> = ({
  setCountryOption,
  text = "Select",
}) => {
  const { getAll } = useCountry();
  let content = useMemo(
    () =>
      getAll().map(({ label, flag, value }) => (
        <MenuItem
          key={value}
          display={"flex"}
          gap={2}
          onClick={() => setCountryOption(value)}
        >
          <div>{flag}</div>
          <div>{label}</div>
        </MenuItem>
      )),

    [setCountryOption]
  );

  return (
    <Menu>
      <MenuButton type="button">
        <p className="text-blue-500">{text}</p>
      </MenuButton>
      <MenuList height={"50vh"} overflowY={"scroll"}>
        {content}
      </MenuList>
    </Menu>
  );
};
export const MomoizedCountryMenu = memo(CountryMenu);

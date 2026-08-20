import { LanguageSelector } from "../layout/language-selector";
import { ThemeSelector } from "../layout/theme-selector/theme-selector";
import { ListGroup } from "../ui/list-group";

export const Preferences = () => {
  return (
    <ListGroup>
      <ListGroup.Header>
        <ListGroup.HeaderTitle>Preferences</ListGroup.HeaderTitle>
      </ListGroup.Header>
      <ListGroup.Body>
        <LanguageSelector />
        <ListGroup.ItemSeparator />
        <ThemeSelector />
      </ListGroup.Body>
    </ListGroup>
  );
};

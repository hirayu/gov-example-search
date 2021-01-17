import React from "react";
import apiClient from "application/apis/api-client";
import {
  AppBar,
  Box,
  Button,
  Container,
  createStyles,
  Divider,
  Fade,
  Grid,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from "@material-ui/icons/Search";
import { ActEntity } from "application/domain/act/act";

type Props = {};

const GovExampleSearch: React.FC<Props> = () => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
        overflow: "hidden",
        padding: theme.spacing(0, 3),
      },
      paper: {
        maxWidth: 1200,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
      },
      search: {
        padding: "2px 4px",
        marginTop: "20px",
        display: "flex",
        alignItems: "center",
        width: 400,
      },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
      divider: {
        height: 28,
        margin: 4,
      },
    })
  );
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const menuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const menuClose = () => {
    setAnchorEl(null);
  };

  const [query, setQuery] = React.useState("");
  const [result, setResult] = React.useState<ActEntity[]>();
  const addPartNoun = () => {
    setQuery(query + "名詞");
    menuClose();
  };
  const addPartVerb = () => {
    setQuery(query + "動詞");
    menuClose();
  };
  const addPartAdjective = () => {
    setQuery(query + "形容詞");
    menuClose();
  };
  const handleClick = () => {
    const searchRes: ActEntity[] = [];
    apiClient.searchMockAct(query).then((res) => {
      res.forEach((a) => {
        searchRes.push(a);
      });
      setResult(searchRes);
    });
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h5">かんたん法制執務</Typography>
          <Typography variant="h6">　用例検索</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Paper component="form" className={classes.search}>
          <InputBase
            className={classes.input}
            placeholder="検索ワード"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            id="outlined-search"
            type="search"
          />
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton
            aria-controls="fade-menu"
            aria-haspopup="true"
            className={classes.iconButton}
            color="primary"
            onClick={menuOpen}
          >
            <AddIcon />
          </IconButton>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={menuClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={addPartNoun}>名詞</MenuItem>
            <MenuItem onClick={addPartVerb}>動詞</MenuItem>
            <MenuItem onClick={addPartAdjective}>形容詞</MenuItem>
            <MenuItem onClick={menuClose}>形容動詞</MenuItem>
            <MenuItem onClick={menuClose}>連体詞</MenuItem>
            <MenuItem onClick={menuClose}>助詞</MenuItem>
            <MenuItem onClick={menuClose}>助動詞</MenuItem>
            <MenuItem onClick={menuClose}>副詞</MenuItem>
            <MenuItem onClick={menuClose}>接続詞</MenuItem>
            <MenuItem onClick={menuClose}>接頭辞</MenuItem>
            <MenuItem onClick={menuClose}>接尾辞</MenuItem>
          </Menu>
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
            onClick={handleClick}
          >
            <SearchIcon />
          </IconButton>
        </Paper>

        {/* <Grid container>
          <Grid item>
            <TextField
              id="outlined-search"
              label="検索ワード"
              type="search"
              size="medium"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleAdd}>
              追加
            </Button>
            <Button variant="contained" color="primary" onClick={handleClick}>
              検索
            </Button>
          </Grid>
        </Grid> */}
      </Container>
      <Container maxWidth="sm">
        <Box className={classes.root}>
          {result &&
            result.map((v) => {
              return (
                <Paper className={classes.paper}>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item xs zeroMinWidth>
                      <Typography noWrap>{v.actName}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              );
            })}
        </Box>
      </Container>
    </>
  );
};

export default GovExampleSearch;

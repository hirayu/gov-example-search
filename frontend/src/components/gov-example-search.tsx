import React from 'react';
import apiClient from 'application/apis/api-client';
import { AppBar, Box, Button, Container, createStyles, Grid, IconButton, makeStyles, Paper, TextField, Theme, Toolbar, Typography} from '@material-ui/core';
import { ActEntity } from 'application/domain/act/act';

type Props = {
};

const GovExampleSearch: React.FC<Props> = () => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexGrow: 1,
                overflow: 'hidden',
                padding: theme.spacing(0, 3),
            },
            paper: {
                maxWidth: 400,
                margin: `${theme.spacing(1)}px auto`,
                padding: theme.spacing(2),
            },
        }),
    );
    const classes = useStyles();

    const [query, setQuery] = React.useState("");
    const [result, setResult] = React.useState<ActEntity[]>()
    const handleClick = () => {
        const searchRes:ActEntity[] = []
        apiClient.searchMockAct(query).then((res) => {
            res.forEach(a => {
                searchRes.push(a);
            });
            setResult(searchRes);
        });
    }

    return (
        <>
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
                <Typography variant="h6" >用例検索サービス</Typography>
            </Toolbar>
        </AppBar>
        <Container maxWidth="sm">
            <Grid container>
                <Grid item>
                    <TextField 
                        id="outlined-search" 
                        label="検索ワード" 
                        type="search"
                        size="medium"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value)
                        }}
                    />
                </Grid>
                <Grid item>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={handleClick}
                    >
                        検索
                    </Button>
                </Grid>
            </Grid>
        </Container>
        <Container maxWidth="sm">
            <Box className={classes.root}>
                {result && result.map((v) => {
                    return (
                        <Paper className={classes.paper}>
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item xs zeroMinWidth>
                                    <Typography noWrap>{v.actName}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    )
                })}
            </Box>
        </Container>
        </>
    )
};

export default GovExampleSearch;
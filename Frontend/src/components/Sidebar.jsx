import * as React from 'react';
import styled from "styled-components";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";
import CategoryIcon from '@mui/icons-material/Category';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Container = styled.div`
  width: 250px;
  background-color: rgb(56, 73, 166);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 40px;
  color: #ffffff;
`;
const linkStyle = {
    textDecoration: 'none', 
    color: 'inherit'
  };

const Sidebar = () => {
    return (
        <Container>
            <Box
                sx={{
                    width: 250,
                    paddingTop: 5,
                }}
            >
                <List>
                <Link to="/admin" style={linkStyle}>
                    <ListItem disablePadding>
                        <ListItemButton>
                                <ListItemIcon>
                                <HomeIcon style={{ color: 'white' }}/>
                                </ListItemIcon>
                                <ListItemText primary={"Home"} />
                            
                        </ListItemButton>
                    </ListItem>
                </Link >
                <Link to="/quotation" style={linkStyle}> 
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <EditNoteIcon style={{ color: 'white' }}/>
                            </ListItemIcon>
                            <ListItemText primary={"Quotation Requests"} />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to="/orders" style={linkStyle}> 
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddShoppingCartIcon style={{ color: 'white' }}/>
                            </ListItemIcon>
                            <ListItemText primary={"Orders Requests"} />
                        </ListItemButton>
                    </ListItem>
                </Link>
                </List>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                            </ListItemIcon >
                            <ListItemText primary={"Products"} style={{ color: 'rgb(176,181,219)' }}/>
                        </ListItemButton>
                    </ListItem>
                    <Link to="/product" style={linkStyle}> 
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                <InboxIcon style={{ color: 'white' }}/>
                                
                                </ListItemIcon>
                                <ListItemText primary={"Products"} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to="/categories" style={linkStyle}> 
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <CategoryIcon style={{ color: 'white' }}/>
                                </ListItemIcon>
                                <ListItemText primary={"Categories"} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to="/brand" style={linkStyle}> 
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <BrandingWatermarkIcon style={{ color: 'white' }}/>
                                </ListItemIcon>
                                <ListItemText primary={"Brands"} />
                            </ListItemButton>
                        </ListItem>
                    </Link>

                    <ListItem 
                    sx={{
                    paddingTop: 37,
                    paddingLeft:4,
                }}>
                        <ListItemButton>
                        <ListItemIcon>
                            <SettingsIcon style={{ color: 'white' }}/>
                        </ListItemIcon>
                        <ListItemText primary={"Settings"}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Container>
    )
}

export default Sidebar
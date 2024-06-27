import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BanType } from "../types/BanType";
import { AdminType } from "../types/AdminType";
import { PlaytimeType } from "../types/PlaytimeType";
import { User } from "../types/UserType";
import { Token } from "../types/TokenType";
import axiosClient from "../utils/axios-client";

interface GlobalContextProps {
    admin: BanType[];
    adminPlaytime: PlaytimeType[];
    admins: BanType[];
    searchedAdmin?: AdminType;
    setSearchedAdmin: (value: AdminType) => void;
    setAdminNickname: (value: string) => void;
    getNumberOfAdminBans: () => number;
    getNumberOfGivenDemos: () => number;
    getNumberOfGivenScreenshots: () => number;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
    collapsed: boolean;
    collapseMenu: () => void;

    user: User | null;
    token: Token | null;
    setUser: (user: User | null) => void;
    setToken: (token: Token | null) => void;

    adminDashboard: AdminType[];
    setAdminDashboard: (adminDashboard: AdminType[]) => void;

    getAdminDetails: () => void;
}

interface GlobalUpdateContextProps {
    getSpecificAdmin: (adminName: string) => Promise<void>;
    getSpecificAdminPlaytime: (adminName: string) => Promise<void>;
}

export const GlobalContext = createContext<GlobalContextProps>({} as GlobalContextProps)
export const GlobalUpdateContext = createContext<GlobalUpdateContextProps>({} as GlobalUpdateContextProps);

export function GlobalProvider({ children }: { children: ReactNode }): JSX.Element {
    const [admin, setAdmin] = useState<BanType[]>([]);
    const [adminPlaytime, setAdminPlaytime] = useState<PlaytimeType[]>([]);
    const [admins, setAdmins] = useState<BanType[]>([]);
    const [searchedAdmin, setSearchedAdmin] = useState<AdminType>();
    const [adminNickname, setAdminNickname] = useState<string>('Axel');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const [user, setUser] = useState<User | null>(null);
    const [token, _setToken] = useState<Token | null>(localStorage.getItem('ACCESS_TOKEN'));
    const [adminDashboard, setAdminDashboard] = useState<AdminType[]>([]);

    const setToken = (token: Token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const getAllAdmins = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("/api/admins");
            setAdmins(res.data);
            setIsLoading(false);
            // console.log(res.data);
        } catch (error) {
            // toast.error("Proba pobrania adminow nie powiodla sie.");
            console.log(error);
        }
    };

    const getSpecificAdmin = async (nickname: string) => {
        setIsLoading(true);
        try {
            const res = await axios.get(`/api/admins/${nickname}`);
            setAdmin(res.data);
            setIsLoading(false);
        } catch (error) {
            // toast.error("Proba pobrania adminow nie powiodla sie.");
            console.log(error);
        }
    }

    const getSpecificAdminPlaytime = async (nickname: string) => {
        setIsLoading(true);
        try {
            const res = await axios.get(`/api/playtimes/${nickname}`);
            setAdminPlaytime(res.data);
            setIsLoading(false);
        } catch (error) {
            // toast.error("Proba pobrania adminow nie powiodla sie.");
            console.log(error);
        }
    }

    const getNumberOfAdminBans = () => {
        return admin.length;
    }

    const getNumberOfGivenDemos = () => {
        let numberOfGivenDemos = admin.filter((ban: BanType) => {
            const reasonLower = ban.Reason ? ban.Reason.toLowerCase() : "";
            return reasonLower.includes("demko") || reasonLower.includes("demo") || reasonLower.includes("pov");
        }).length;
        return numberOfGivenDemos;
    }

    const getNumberOfGivenScreenshots = () => {
        let numberOfGivenScreenshots = admin.filter((ban: BanType) => {
            const reasonLower = ban.Reason ? ban.Reason.toLowerCase() : "";
            return reasonLower.includes("wstaw_screeny") || reasonLower.includes("screenshooty");
        }).length;
        return numberOfGivenScreenshots;
    }

    const collapseMenu = () => {
        setCollapsed(!collapsed);
    };

    const getAdminDetails = async () => {
        setIsLoading(true);

        axiosClient.get(`/admins`)
            .then(({ data }) => {
                console.log(data.data);
                setAdminDashboard(data.data);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
        // setIsLoading(false);
    }


    useEffect(() => {
        getAllAdmins();
        getAdminDetails();
    }, []);

    return (
        <GlobalContext.Provider value={{
            admin,
            adminPlaytime,
            admins,
            searchedAdmin,
            setSearchedAdmin,
            setAdminNickname,
            getNumberOfAdminBans,
            getNumberOfGivenDemos,
            getNumberOfGivenScreenshots,
            isLoading,
            setIsLoading,
            collapsed,
            collapseMenu,
            user,
            token,
            setUser,
            setToken,
            adminDashboard,
            setAdminDashboard,
            getAdminDetails
        }}>
            <GlobalUpdateContext.Provider value={{ getSpecificAdmin, getSpecificAdminPlaytime }}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
};


export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);

import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.routes";
import { categoryRoutes } from "../modules/category/category.route";
import { serviceRoutes } from "../modules/service/service.route";


export const router = Router();

const moduleRoutes = [
    {
        path: "/user",
        route: userRoutes
    },
    {
        path: "/auth",
        route: authRoutes
    },
     {
        path: "/categories",
        route: categoryRoutes
    },
     {
        path: "/services",
        route: serviceRoutes
    }

]

moduleRoutes.forEach(route => {
    router.use(route.path, route.route)
})
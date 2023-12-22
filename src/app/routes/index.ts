import express from 'express';
const router = express.Router();
import { OrganizationRoutes } from '../modules/organization/organization.route';
import { UserRoutes } from '../modules/user/user.route';

const moduleRoutes = [
  {
    path: '/organization',
    route: OrganizationRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;

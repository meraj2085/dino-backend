import express from 'express';
const router = express.Router();
import { OrganizationRoutes } from '../modules/organization/organization.route';

const moduleRoutes = [
  {
    path: '/organization',
    route: OrganizationRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;

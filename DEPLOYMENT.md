# RealNet Production Deployment Guide

This guide outlines the manual steps required to finalize the production setup on the server, as some configurations (like Nginx Proxy Manager) cannot be automated via the repository.

## 1. Nginx Proxy Manager Configuration

Since the backend is now isolated on an internal network with no exposed ports, you must configure Nginx Proxy Manager (NPM) to route traffic correctly.

### Backend (admin.realnet-web.co.za)
*   **Scheme:** `http`
*   **Hostname/IP:** `realnet-admin` (since they share the same Docker network) OR the Docker Host IP if using bridge mode.
    *   *Note:* If NPM is in a different docker network, ensure you join it to `realnet-network` or use the host IP and map the port temporarily for setup, but strictly speaking, we disabled port mapping for security.
    *   **Recommended:** Add NPM container to `realnet-network` so it can resolve `realnet-admin` by name on port `8080`.
*   **Port:** `8080`

### Frontend (realnet-web.co.za)
*   **Scheme:** `http`
*   **Hostname/IP:** `realnet-app`
*   **Port:** `3000`

### Security Rules (Advanced Tab)
Add the following configuration to the **Custom Locations** or **Advanced Configuration** block for `admin.realnet-web.co.za` to block bots and scanners:

```nginx
# Block sensitive paths and common exploits
location ~* ^/(wp-admin|wp-login\.php|xmlrpc\.php|\.git|\.env|\.DS_Store|.*\.sql|.*\.bak) {
    return 444;
}

# Block common exploits
if ($request_uri ~* "(eval\(|base64_|1=1|UNION SELECT|<script>)") {
    return 444;
}
```

## 2. Environment Variables

Ensure your production `.env` file in `realnet-admin/` has the following set for performance:

```ini
APP_ENV=production
APP_DEBUG=false
LOG_LEVEL=error
```

## 3. Verification Steps

After pulling the changes and rebuilding:

1.  **Build and Start (Production):**
    ```bash
    docker compose down
    docker compose -f docker-compose.prod.yml up -d --build
    ```

2.  **Verify Non-Root Execution:**
    ```bash
    docker exec realnet-admin whoami
    # Should output: www-data

    docker exec realnet-app whoami
    # Should output: node
    ```

3.  **Verify Read-Only Filesystem:**
    ```bash
    docker exec realnet-admin touch /root_test
    # Should fail: Read-only file system
    ```

4.  **Check Resource Usage:**
    ```bash
    docker stats --no-stream
    # Ensure memory usage is within limits (Limit: 512MiB)
    ```

5.  **SEO Check:**
    *   Visit `https://realnet-web.co.za/sitemap.xml` and ensure it loads without error.
    *   Check `https://realnet-web.co.za/robots.txt` to confirm `/admin` is disallowed.

## 4. Troubleshooting

If the application fails to start:
*   **Permission Errors:** Check if `storage/` and `bootstrap/cache/` are writable.
*   **Network Errors:** Ensure Nginx Proxy Manager is on the same Docker network `realnet-network`.

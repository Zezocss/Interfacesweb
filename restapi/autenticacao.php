<?php

require_once 'jwt_utils.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';

    $token = authenticate_user($username, $password);
    if ($token) {
        echo json_encode(['token' => $token]);
    } else {
        header('HTTP/1.1 401 Unauthorized');
        echo json_encode(['error' => 'Invalid credentials']);
    }
    exit;
}

function require_auth() {
    $jwt = get_bearer_token();
    if ($jwt === null || !is_jwt_valid($jwt)) {
        header('HTTP/1.1 401 Unauthorized');
        exit;
    }
}


function authenticate_user($username, $password) {
    $AUTH_USER = 'admin';
    $AUTH_PASS = 'admin';
    if ($username === $AUTH_USER && $password === $AUTH_PASS) {
        return generate_user_jwt($username);
    }
    return null;
}

?>
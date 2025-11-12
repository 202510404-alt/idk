// 1. 캔버스 및 컨텍스트 가져오기 (도화지를 준비)
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 맵 데이터 (예시: 10x8 크기의 맵)
const TILE_SIZE = 40; // 타일 하나의 크기 (가로/세로 40픽셀)
const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 1, 1, 0, 1], // 맵 중간에 벽(1)을 만들었습니다.
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// 캔버스 크기를 맵 크기에 맞게 변경 (800x600 대신 맵 크기에 맞춤)
canvas.width = map[0].length * TILE_SIZE; // 10 * 40 = 400
canvas.height = map.length * TILE_SIZE;    // 8 * 40 = 320

// 맵 크기에 맞게 플레이어 초기 y 위치 재설정
player.y = canvas.height - TILE_SIZE - player.height; // 바닥 타일 위에 놓이도록
player.speed = 3; // 맵 크기가 작아졌으니 속도도 약간 줄임
// 2. 플레이어 객체 정의 (우리의 네모 캐릭터)
let player = {
    x: 50,          // 시작 X 좌표
    y: canvas.height - 80, // 바닥에 붙여서 시작 (캔버스 높이 - 캐릭터 높이)
    width: 30,
    height: 50,
    color: 'cyan',
    speed: 5,       // 이동 속도
    dx: 0,          // X축 이동 속도 (키 누르면 -5 또는 +5)
    dy: 0           // Y축 이동 속도 (점프/중력용)
};

// 3. 키보드 입력 상태 저장
let keys = {
    right: false,
    left: false,
    up: false
};

// 4. 키 입력 이벤트 리스너 설정
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') keys.right = true;
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = true;
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') keys.up = true; // 스페이스바도 점프
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = false;
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') keys.up = false;
});


// 5. 게임 로직 업데이트 함수 (프레임마다 호출되어 상태를 변경함)
function update() {
    // ----------------- 이동 처리 -----------------
    player.dx = 0;
    if (keys.left) {
        player.dx = -player.speed;
    }
    if (keys.right) {
        player.dx = player.speed;
    }
    
    // 위치 적용
    player.x += player.dx;

    // ----------------- 경계선 체크 (벽에 부딪히지 않게) -----------------
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
    
    // 여기서는 중력/점프 로직은 생략하고 이동만 구현했습니다.
}
// 6. 그리기 함수 (업데이트된 상태를 화면에 표시)
function draw() {
    // 1. 화면 지우기 (이전 프레임 흔적 제거)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // === 맵 그리기 시작 ===
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (map[row][col] === 1) {
                // 맵 데이터가 1이면 벽(땅)을 그립니다.
                ctx.fillStyle = 'gray'; // 벽 색상
                // 타일 위치 계산: (열 * 타일크기, 행 * 타일크기)
                ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }
    // === 맵 그리기 끝 ===


    // 플레이어 그리기 (항상 맵 위에 겹쳐져야 하므로 아래에 둡니다)
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// 7. 게임 루프 (게임의 심장)
function gameLoop() {
    update(); // 상태 업데이트
    draw();   // 화면 그리기
    
    // 다음 프레임 요청 (약 60fps)
    requestAnimationFrame(gameLoop);
}

// 게임 시작!
gameLoop();

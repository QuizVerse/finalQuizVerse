
@RestController
@RequiredArgsConstructor
@RequestMapping("/solvedbook")
public class SolvedBookController {

    private final SolvedbookService solvedbookService;

    // 사용자의 힉습이력 출력
    @GetMapping("/getall/{id}")
    public ResponseEntity<List<SolvedBookInfoDto>> getUserBooks(@PathVariable("id") int userId) {
        List<SolvedBookInfoDto> solvedBookInfo = solvedbookService.getSolvedBooksByUserId(userId);

        if (solvedBookInfo.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(solvedBookInfo, HttpStatus.OK);
    }


   /* @PostMapping("/test/finish")
    public ResponseEntity<Object> finishSolvedBook(@RequestBody SolvedBookInfoDto solvedBookInfo) {

    }*/


}
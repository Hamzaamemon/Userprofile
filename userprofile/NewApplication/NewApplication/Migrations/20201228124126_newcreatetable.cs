using Microsoft.EntityFrameworkCore.Migrations;

namespace NewApplication.Migrations
{
    public partial class newcreatetable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "multipleFilesUploads",
                columns: table => new
                {
                    Files_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Files_Path = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    signupsUserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_multipleFilesUploads", x => x.Files_Id);
                    table.ForeignKey(
                        name: "FK_multipleFilesUploads_Signups_signupsUserId",
                        column: x => x.signupsUserId,
                        principalTable: "Signups",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_multipleFilesUploads_signupsUserId",
                table: "multipleFilesUploads",
                column: "signupsUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "multipleFilesUploads");
        }
    }
}

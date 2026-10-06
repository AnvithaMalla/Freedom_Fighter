from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.database import Base


class Punishment(Base):
    __tablename__ = "punishments"

    punishment_id: Mapped[str] = mapped_column(
        String(50),
        primary_key=True,
    )

    person_id: Mapped[str] = mapped_column(
        ForeignKey("persons.person_id"),
        nullable=False,
    )

    punishment: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    punishment_year: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True,
    )

    person = relationship(
        "Person",
        back_populates="punishments",
    )